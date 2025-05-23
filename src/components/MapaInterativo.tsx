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
  horario_funcionamento?: string;  // nome correto do campo
  descricao: string;
};

type Linha = {
  nome: string;
  cor: string;
  estacoes: Estacao[];
};

const icons: Record<string, string> = {
  Amarela: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  Lilás: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  Diamante: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  Esmeralda: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
};

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
      .then(data => {
        console.log('Dados das linhas carregadas:', data);
        setLinhas(data);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAuk2FvGEkh7dLim8PmMc29ZTX1WY1AKKs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {linhas.map((linha, idx) => (
          <React.Fragment key={idx}>
            <Polyline
              path={linha.estacoes.map(est => ({ lat: est.lat, lng: est.lng }))}
              options={{
                strokeColor: linha.cor,
                strokeOpacity: 1,
                strokeWeight: 4,
              }}
            />

            {linha.estacoes.map((est, i) => (
              <Marker
                key={i}
                position={{ lat: est.lat, lng: est.lng }}
                icon={icons[linha.nome]}
                onClick={() => setSelectedEstacao({ ...est, linhaNome: linha.nome })}
              />
            ))}
          </React.Fragment>
        ))}

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
                <strong>Horário:</strong> {selectedEstacao.horario_funcionamento ?? "Não informado"}
              </p>
              <p style={{ margin: "4px 0 0" }}>
                {selectedEstacao.descricao}
              </p>
            </div>
          </InfoWindow>
        )}

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
