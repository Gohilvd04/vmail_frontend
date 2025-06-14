import React from "react";

const styles = {
  item: {
    height: "40px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    borderRadius: "0 20px 20px 0",
    color: "#818181",
    cursor: "pointer",
    userSelect: "none",
  },
  icon: {
    padding: "5px",
  },
  title: {
    marginLeft: "10px",
    flex: 1,
    fontSize: "14px",
    fontWeight: 400,
    userSelect: "none",
  },
  number: {
    display: "none",
    userSelect: "none",
  },
  active: {
    backgroundColor: "#fcecec",
    color: "#c04b37",
    fontWeight: 700,
  },
  activeNumber: {
    display: "inline",
  },
};

const SidebarOption = ({
  Icon,
  title,
  number,
  selected,
  onClick,
  className,
}) => {
  return (
    <div
      style={{
        ...styles.item,
        ...(selected ? styles.active : {}),
        ...(className ? styles[className] : {}),
      }}
      onClick={onClick}
    >
      <Icon style={styles.icon} fontSize="large" />
      <h3 style={styles.title}>{title}</h3>
      <p style={{ ...styles.number, ...(selected ? styles.activeNumber : {}) }}>
        {number}
      </p>
    </div>
  );
};

export default SidebarOption;
