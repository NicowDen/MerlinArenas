import mc from "./logs-menu.module.scss";

const LogsMenu = ({ logs }) => {
  return (
    <div className={mc.container}>
      <h3>LOGS</h3>
      <div>
        <ul className={mc.logs_list}>
          {logs.map((el, i) => (
            <li key={i} className={mc.log}>
              <span>{el}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogsMenu;
