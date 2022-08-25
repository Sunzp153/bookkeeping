
import { NavLink, Outlet } from "react-router-dom";
import './Home.scss'
export default function Stats() {

  return (
    <div className="Home">
      <div className="Home-left">
        <div className="title"><span>记账系统</span></div>
        <div className="Bill">
          <NavLink to="bill">
            <span>账单</span>
          </NavLink>
        </div>
        <div className="Stats">
          <NavLink to="stats">
            <span>统计</span>
          </NavLink>
        </div>
      </div>
      <div className="Home-right">
        <div className="top">
        </div>
        <div className="main">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
