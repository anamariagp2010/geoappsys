/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import tolimaImage from "./tolima.png";
import grafImage from "./graf.jpeg";
import heat1Image from "./heat1.jpeg";
import heat2Image from "./heat2.jpeg";

// Asegúrate de tener tu token de acceso a Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoidGF0aWFzIiwiYSI6ImNsaTFxaGF3ajFvd3EzZW9pZjZkanAxNWgifQ.wfV9iK-TJjEmuQzZEGdETg";

const Mapa = () => {
  const mapContainerRef = useRef(null);
  const infoContainerRef = useRef(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [pointData, setPointData] = useState(null);
  const size = 100;

  useEffect(() => {
    // Carga el archivo GeoJSON
    fetch(`/data.geojson`)
      .then((response) => response.json())
      .then((data) => {
        // Asigna un color aleatorio a cada polígono
        const coloredData = {
          ...data,
          features: data.features.map((feature, index) => ({
            ...feature,
            properties: {
              ...feature.properties,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            },
          })),
        };
        setGeojsonData(coloredData);
      });

    fetch(`/points.geojson`)
      .then((response) => response.json())
      .then((data) => {
        setPointData(data); // Guarda los datos de puntos en el estado
      });
  }, []);

  useEffect(() => {
    if (!geojsonData || !pointData) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [-74.2973, 4.5709],
      zoom: 4.5,
    });

    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      },
    };

    map.on("load", () => {
      map.addSource("polygons", {
        type: "geojson",
        data: geojsonData,
      });

      map.addLayer({
        id: "polygon-layer",
        type: "fill",
        source: "polygons",
        layout: {},
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.2,
        },
      });

      map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

      map.addSource("dot-point", {
        type: "geojson",
        data: pointData,
        cluster: false,
      });
      map.addLayer({
        id: "layer-with-pulsing-dot",
        type: "symbol",
        source: "dot-point",
        layout: {
          "icon-image": "pulsing-dot",
        },
      });
    });

    map.on("click", "polygon-layer", (e) => {
      e.preventDefault();
      const properties = e.features[0].properties;
      const info = Object.keys(properties)
        .map((key) => `<strong>${key}</strong>: ${properties[key]}`)
        .join("<br />");
      infoContainerRef.current.innerHTML = info;
    });

    map.on("click", "layer-with-pulsing-dot", (e) => {
      e.preventDefault();

      const properties = e.features[0].properties;
      const info = Object.keys(properties)
        .map((key) => `<strong>${key}</strong>: ${properties[key]}`)
        .join("<br />");

      // Agregar las imágenes al contenedor después de las propiedades
      infoContainerRef.current.innerHTML =
        info +
        `<img src="${tolimaImage}" alt="Tolima Image" style="width: 100%; display: block; margin-top: 10px;"/>` +
        `<img src="${grafImage}" alt="Graf Image" style="width: 100%; display: block; margin-top: 10px;"/>` +
        `<img src="${heat1Image}" alt="heat1 Image" style="width: 100%; display: block; margin-top: 10px;"/>` +
        `<img src="${heat2Image}" alt="heat2 Image" style="width: 100%; display: block; margin-top: 10px;"/>`;

      map.flyTo({
        center: e.lngLat,
        zoom: 9,
      });
    });

    return () => map.remove();
  }, [geojsonData, pointData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        paddingBottom: "60px",
      }}
    >
      <div ref={mapContainerRef} style={{ height: "80%" }} />
      <div
        ref={infoContainerRef}
        style={{
          padding: "25px",
          paddingTop: "60px",
          height: "20%",
        }}
      ></div>
    </div>
  );
};

export default Mapa;
