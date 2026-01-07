import React from "react";
import "./Home.css";
import { IoShareOutline, IoNotificationsOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

function Home() {
  return (
    <div className="m">
    <div className="page">
      <div className="card">
        {/* TOP */}
        <div className="top">
          <div className="profile">
            <img src="dam.png" alt="avatar" />
            <div>
              <h2>Hi, temur</h2>
              <p>buymeacoffee.com/temur7</p>
            </div>
          </div>

          <div className="actions">
            <button className="share">
              <IoShareOutline /> Share page
            </button>
            <div className="bell">
              <IoNotificationsOutline />
            </div>
          </div>
        </div>

        <hr />

        {/* EARNINGS */}
        <div className="earnings">
          <div className="earnings-header">
            <h3>Earnings</h3>

            <select>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>

          <h1 className="hr">$0</h1>

          <div className="stats">
            <span className="supporters">$0 Supporters</span>
            <span className="membership">$0 Membership</span>
            <span className="shop">$0 Shop</span>
          </div>
        </div>

        
      </div>
     
    </div>
     <div className="cord">
          <div className="cord2">
            <div className="icoo">
           <CiHeart/>
           </div>
          </div>
          <div className="mnb">
            <h3>You don't have any supporters yet</h3>
            <p>Share your page with your audience to get started.</p>
          </div>
        </div>
    </div>
  );
}

export default Home;
