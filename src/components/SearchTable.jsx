import React from "react";
import Button from "./Button.jsx";

export default function SearchTable({
  headers = [],
  rows = [],
  onActionClick,
  actionLabel = "Ação",
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "15px",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "10px 12px",
                  borderBottom: "2px solid #ddd",
                  color: "#333",
                  fontWeight: "600",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: "1px solid #eee",
                  backgroundColor: "#fafafa",
                }}
              >
                <td style={{ padding: "8px 12px" }}>{row.nome}</td>
                <td style={{ padding: "8px 12px" }}>{row.cpf}</td>
                <td style={{ padding: "8px 12px" }}>{row.nascimento}</td>
                <td style={{ padding: "8px 12px" }}>{row.responsavel}</td>
                <td style={{ padding: "8px 12px" }}>
                  <Button onClick={() => onActionClick(row.id)}>
                    {actionLabel}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ padding: "10px", color: "#666" }}>
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
