'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -23.55,
  lng: -46.63
};

type Estacao = {
  nome: string;
  lat: number;
  lng: number;
  horario_funcionamento: string;
  descricao: string;
};

type Linha = {
  nome: string;
  cor: string;
  estacoes: Estacao[];
};

const mapaEscuroStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
];

const legendaStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  zIndex: 10,
  fontFamily: "Arial, sans-serif",
};

const LinhaLegenda = ({ nome, cor }: { nome: string; cor: string }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
    <div style={{ width: 20, height: 20, backgroundColor: cor, marginRight: 8, borderRadius: 4 }} />
    <span>{nome}</span>
  </div>
);

const MapaGoogle = () => {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [selectedEstacao, setSelectedEstacao] = useState<Estacao & { linhaNome?: string } | null>(null);

  useEffect(() => {
    fetch('/linhas.json')
      .then(res => res.json())
      .then(data => setLinhas(data));
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAuk2FvGEkh7dLim8PmMc29ZTX1WY1AKKs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ styles: mapaEscuroStyle }}
      >
        {linhas.map((linha, idx) => (
          <React.Fragment key={idx}>
            {/* Polyline da linha */}
            <Polyline
              path={linha.estacoes.map(est => ({ lat: est.lat, lng: est.lng }))}
              options={{
                strokeColor: linha.cor,
                strokeOpacity: 1,
                strokeWeight: 4,
              }}
            />

            {/* Marcadores das estações - pontos brancos */}
            {linha.estacoes.map((est, i) => (
              <Marker
                key={i}
                position={{ lat: est.lat, lng: est.lng }}
                icon={{
                  path: "M0 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0", // círculo
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 1
                }}
                onClick={() => setSelectedEstacao({ ...est, linhaNome: linha.nome })}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Popup InfoWindow */}
        {selectedEstacao && (
          <InfoWindow
            position={{ lat: selectedEstacao.lat, lng: selectedEstacao.lng }}
            onCloseClick={() => setSelectedEstacao(null)}
          >
            <div style={{ fontFamily: "Arial, sans-serif", minWidth: 200 }}>
              <h3 style={{ margin: 0 }}>{selectedEstacao.nome}</h3>
              <p style={{
                margin: "4px 0 0",
                fontWeight: "bold",
                color: linhas.find(l => l.nome === selectedEstacao.linhaNome)?.cor || 'black'
              }}>
                {selectedEstacao.linhaNome}
              </p>
              <p style={{ margin: "4px 0 0" }}>
                <strong>Horário:</strong> {selectedEstacao.horario_funcionamento}
              </p>
              <p style={{ margin: "4px 0 0" }}>
                {selectedEstacao.descricao}
              </p>
            </div>
          </InfoWindow>
        )}

        {/* Legenda fixa */}
        <div style={legendaStyle}>
          {linhas.map(linha => (
            <LinhaLegenda key={linha.nome} nome={linha.nome} cor={linha.cor} />
          ))}
        </div>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapaGoogle;
