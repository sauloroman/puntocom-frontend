import { useState } from "react";

const COLORS = {
  presentation: { fill: "#dbeafe", stroke: "#3b82f6", text: "#1e40af", header: "#3b82f6", headerText: "#ffffff" },
  application:  { fill: "#ede9fe", stroke: "#7c3aed", text: "#4c1d95", header: "#7c3aed", headerText: "#ffffff" },
  domain:       { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d", header: "#16a34a", headerText: "#ffffff" },
  infrastructure:{ fill: "#fff7ed", stroke: "#ea580c", text: "#7c2d12", header: "#ea580c", headerText: "#ffffff" },
  db:           { fill: "#f1f5f9", stroke: "#64748b", text: "#334155", header: "#64748b", headerText: "#ffffff" },
};

const layers = [
  {
    id: "presentation", label: "Presentation Layer",
    subtitle: "Punto de entrada HTTP · Express.js",
    color: COLORS.presentation,
    nodes: [
      { id: "server",      label: "Server",           sub: "Express + CORS\nFileUpload + Static" },
      { id: "routes",      label: "AppRoutes",         sub: "/api/user\n/api/product…" },
      { id: "middlewares", label: "Middlewares",        sub: "Auth · Roles\nParams · Errors" },
      { id: "controllers", label: "Controllers",        sub: "UserController\nProductController…" },
      { id: "validators",  label: "Validators",         sub: "CreateUserValidator\nUpdateUserValidator…" },
    ],
  },
  {
    id: "application", label: "Application Layer",
    subtitle: "Lógica de negocio · Casos de uso",
    color: COLORS.application,
    nodes: [
      { id: "services",  label: "Services",   sub: "UserService\nProductService…" },
      { id: "usecases",  label: "Use Cases",  sub: "CreateUser · Login\nChangePassword…" },
      { id: "dtos",      label: "DTOs",       sub: "CreateUserDTO\nPaginationDTO…" },
    ],
  },
  {
    id: "domain", label: "Domain Layer",
    subtitle: "Núcleo del sistema · Sin dependencias externas",
    color: COLORS.domain,
    nodes: [
      { id: "entities",    label: "Entities",              sub: "User · Product\nSale · Purchase…" },
      { id: "valueobjs",   label: "Value Objects",          sub: "Email · Password\nRole · Phone" },
      { id: "repo_iface",  label: "Repository\n(interface)", sub: "UserRepository\nProductRepository…" },
      { id: "ds_iface",    label: "Datasource\n(interface)", sub: "UserDatasource\nProductDatasource…" },
    ],
  },
  {
    id: "infrastructure", label: "Infrastructure Layer",
    subtitle: "Implementaciones concretas · MSSQL · Cloudinary · NodeMailer",
    color: COLORS.infrastructure,
    nodes: [
      { id: "mssql",    label: "MSSQL Datasources", sub: "MSSQLUsers\nMSSQLProducts…" },
      { id: "repoimpl", label: "Repository Impl",   sub: "UserRepositoryImpl\nProductRepositoryImpl…" },
      { id: "mappers",  label: "Mappers",            sub: "UserMapper.fromSQL\nProductMapper.fromSQL" },
      { id: "extsvcs",  label: "External Services",  sub: "NodeMailerService\nCloudinaryService" },
    ],
  },
];

const flowSteps = [
  { label: "HTTP Request", layer: "–", icon: "🌐" },
  { label: "Middleware", layer: "Presentation", icon: "🛡️" },
  { label: "Controller", layer: "Presentation", icon: "🎮" },
  { label: "Validator", layer: "Presentation", icon: "✅" },
  { label: "Service", layer: "Application", icon: "⚙️" },
  { label: "Use Case", layer: "Application", icon: "📋" },
  { label: "Repository Interface", layer: "Domain", icon: "📦" },
  { label: "Repository Impl", layer: "Infrastructure", icon: "🔧" },
  { label: "MSSQL Datasource", layer: "Infrastructure", icon: "🔌" },
  { label: "SQL Server", layer: "DB", icon: "🗄️" },
];

const layerColor = (layer) => {
  if (layer === "Presentation") return COLORS.presentation;
  if (layer === "Application") return COLORS.application;
  if (layer === "Domain") return COLORS.domain;
  if (layer === "Infrastructure") return COLORS.infrastructure;
  return COLORS.db;
};

function Node({ label, sub, color }) {
  return (
    <div style={{
      background: color.fill,
      border: `1.5px solid ${color.stroke}`,
      borderRadius: 6,
      padding: "8px 12px",
      minWidth: 130,
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ fontWeight: 700, fontSize: 12, color: color.text, whiteSpace: "pre-line", lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 10, color: color.text, opacity: 0.75, marginTop: 4, whiteSpace: "pre-line", lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function LayerBox({ layer, isLast }) {
  const c = layer.color;
  return (
    <div style={{ marginBottom: 0 }}>
      <div style={{
        border: `1.5px solid ${c.stroke}`,
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      }}>
        {/* Header */}
        <div style={{
          background: c.header,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.25)",
            borderRadius: 4,
            padding: "2px 8px",
            fontSize: 11,
            fontWeight: 800,
            color: c.headerText,
            letterSpacing: 1,
            fontFamily: "'Segoe UI', sans-serif",
          }}>{layer.label}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontFamily: "'Segoe UI', sans-serif" }}>
            {layer.subtitle}
          </div>
        </div>
        {/* Nodes */}
        <div style={{
          padding: "14px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "flex-start",
          background: c.fill + "55",
        }}>
          {layer.nodes.map((n) => (
            <Node key={n.id} label={n.label} sub={n.sub} color={c} />
          ))}
        </div>
      </div>

      {/* Arrow between layers */}
      {!isLast && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 36 }}>
          <div style={{ width: 1.5, flex: 1, background: "#94a3b8" }} />
          <svg width="12" height="10" viewBox="0 0 12 10">
            <polygon points="6,10 0,0 12,0" fill="#94a3b8" />
          </svg>
        </div>
      )}
    </div>
  );
}

function DbBox() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 36 }}>
        <div style={{ width: 1.5, flex: 1, background: "#94a3b8" }} />
        <svg width="12" height="10" viewBox="0 0 12 10">
          <polygon points="6,10 0,0 12,0" fill="#94a3b8" />
        </svg>
      </div>
      <div style={{
        border: `1.5px solid ${COLORS.db.stroke}`,
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      }}>
        <div style={{ background: COLORS.db.header, padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>🗄️</span>
          <div style={{ fontWeight: 800, fontSize: 11, color: "#fff", letterSpacing: 1, fontFamily: "'Segoe UI', sans-serif" }}>
            SQL SERVER (MSSQL)
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontFamily: "'Segoe UI', sans-serif" }}>
            Base de datos relacional · ConnectionPool · Queries parametrizadas
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Test() {
  const [tab, setTab] = useState("layers");

  return (
    <div style={{
      background: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "24px",
    }}>

      {/* Title */}
      <div style={{
        background: "#fff",
        border: "1.5px solid #e2e8f0",
        borderRadius: 8,
        padding: "14px 20px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", letterSpacing: 0.5 }}>
            PuntoCom — Arquitectura del Backend
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            Clean Architecture · Node.js + Express · TypeScript · MSSQL
          </div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {layers.map(l => (
            <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color.header }} />
              <span style={{ fontSize: 11, color: "#475569" }}>{l.label.replace(" Layer", "")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 0,
        marginBottom: 20,
        background: "#fff",
        border: "1.5px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        width: "fit-content",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        {[["layers", "Diagrama de Capas"], ["flow", "Flujo de Request"], ["containers", "Contenedores DI"]].map(([id, label], i, arr) => (
          <button key={id} onClick={() => setTab(id)} style={{
            background: tab === id ? "#3b82f6" : "#fff",
            color: tab === id ? "#fff" : "#475569",
            border: "none",
            borderRight: i < arr.length - 1 ? "1.5px solid #e2e8f0" : "none",
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: tab === id ? 700 : 400,
            fontFamily: "'Segoe UI', sans-serif",
            transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {/* LAYERS TAB */}
      {tab === "layers" && (
        <div style={{ maxWidth: 820 }}>
          {layers.map((layer, i) => (
            <LayerBox key={layer.id} layer={layer} isLast={i === layers.length - 1} />
          ))}
          <DbBox />
        </div>
      )}

      {/* FLOW TAB */}
      {tab === "flow" && (
        <div style={{ maxWidth: 640 }}>
          <div style={{
            background: "#fff",
            border: "1.5px solid #e2e8f0",
            borderRadius: 8,
            padding: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 20, fontWeight: 600, letterSpacing: 0.5 }}>
              CICLO DE VIDA DE UNA PETICIÓN HTTP
            </div>
            {flowSteps.map((step, i) => {
              const c = layerColor(step.layer);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    background: i === 0 ? "#f8fafc" : c.fill,
                    border: `1.5px solid ${i === 0 ? "#cbd5e1" : c.stroke}`,
                    borderRadius: 6,
                    padding: "10px 14px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                    <span style={{ fontSize: 18, minWidth: 24, textAlign: "center" }}>{step.icon}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: i === 0 ? "#334155" : c.text }}>
                        {step.label}
                      </span>
                    </div>
                    <div style={{
                      background: i === 0 ? "#e2e8f0" : c.header,
                      color: i === 0 ? "#475569" : c.headerText,
                      borderRadius: 4,
                      padding: "2px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      whiteSpace: "nowrap",
                    }}>
                      {step.layer}
                    </div>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, height: 24, marginLeft: 10 }}>
                      <div style={{ width: 1.5, flex: 1, background: "#cbd5e1" }} />
                      <svg width="10" height="8" viewBox="0 0 10 8">
                        <polygon points="5,8 0,0 10,0" fill="#94a3b8" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTAINERS TAB */}
      {tab === "containers" && (
        <div style={{ maxWidth: 820 }}>
          <div style={{
            background: "#fff",
            border: "1.5px solid #e2e8f0",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            {/* Root container header */}
            <div style={{ background: "#0f172a", padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: 1 }}>Container (Root)</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>MssqlClient.getConnection() → ConnectionPool</div>
            </div>

            <div style={{ padding: 20 }}>
              {/* Module containers grid */}
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: 0.5, marginBottom: 12 }}>
                MÓDULOS INSTANCIADOS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  { name: "UserContainer", c: COLORS.presentation },
                  { name: "ProductContainer", c: COLORS.application },
                  { name: "SaleContainer", c: COLORS.domain },
                  { name: "PurchaseContainer", c: COLORS.infrastructure },
                  { name: "CategoryContainer", c: COLORS.presentation },
                  { name: "SupplierContainer", c: COLORS.application },
                  { name: "ReportContainer", c: COLORS.domain },
                  { name: "InventoryContainer", c: COLORS.infrastructure },
                  { name: "DashboardContainer", c: COLORS.presentation },
                ].map(({ name, c }) => (
                  <div key={name} style={{
                    border: `1.5px solid ${c.stroke}`,
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "#fff",
                  }}>
                    <div style={{ background: c.header, padding: "5px 10px" }}>
                      <span style={{ fontWeight: 700, fontSize: 11, color: c.headerText }}>{name}</span>
                    </div>
                    <div style={{ padding: "8px 10px", background: c.fill + "88" }}>
                      {["Datasource", "Repository", "Use Cases", "Service", "Controller", "Routes"].map(step => (
                        <div key={step} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: c.stroke }} />
                          <span style={{ fontSize: 10, color: c.text }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow down */}
              <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 28 }}>
                  <div style={{ width: 1.5, flex: 1, background: "#94a3b8" }} />
                  <svg width="12" height="10" viewBox="0 0 12 10">
                    <polygon points="6,10 0,0 12,0" fill="#94a3b8" />
                  </svg>
                </div>
              </div>

              {/* AppRoutes */}
              <div style={{
                border: "1.5px solid #3b82f6",
                borderRadius: 6,
                overflow: "hidden",
              }}>
                <div style={{ background: "#3b82f6", padding: "6px 14px" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: "#fff" }}>AppRoutes</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginLeft: 10 }}>
                    Registra todos los módulos en el Router de Express
                  </span>
                </div>
                <div style={{ padding: "10px 14px", background: "#dbeafe55", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["/api/user", "/api/product", "/api/sale", "/api/purchase", "/api/category", "/api/supplier", "/api/report", "/api/inventory-adjustment", "/api/dashboard-stats"].map(r => (
                    <span key={r} style={{
                      background: "#dbeafe",
                      border: "1px solid #93c5fd",
                      color: "#1d4ed8",
                      padding: "2px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontFamily: "monospace",
                      fontWeight: 600,
                    }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}