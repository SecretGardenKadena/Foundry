import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Private from "./Private";
import Public from "./Public";

// Admin Pages
import Home from "../Pages/Home";
import BuyNFT from "../Pages/BuyNFT";
import Staking from "../Pages/staking";
import GenZero from "../Pages/Collection/gen_zero";
import BattleHero from "../Pages/Collection/battle_hero";
import Collections from "../Pages/Collection";
import GenOne from "../Pages/Collection/gen_one";
import WeaponGears from "../Pages/Collection/weapon_gear";
import Dashboard from "../Pages/dashboard/Dashboard";
import Armory from "../Pages/armory/Armory";
import Foundry from "../Pages/foundry/Foundry";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Home />
            </Public>
          }
        />
        <Route
          path="/staking"
          element={
            <Public>
              <Staking />
            </Public>
          }
        />
        <Route
          path="/collection"
          element={
            <Public>
              <Collections />
            </Public>
          }
        />
        <Route
          path="/gen-0"
          element={
            <Public>
              <GenZero />
            </Public>
          }
        />
        <Route
          path="/gen-1"
          element={
            <Public>
              <GenOne />
            </Public>
          }
        />
        <Route
          path="/weapons-gears"
          element={
            <Public>
              <WeaponGears />
            </Public>
          }
        />
        <Route
          path="/battle-heroes"
          element={
            <Public>
              <BattleHero />
            </Public>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Public>
              <Dashboard />
            </Public>
          }
        />
        <Route
          path="/armory"
          element={
            <Public>
              <Armory />
            </Public>
          }
        />
        <Route
          path="/foundry"
          element={
            <Public>
              <Foundry />
            </Public>
          }
        />
        <Route
          path="/buynft"
          element={
            <Public>
              <BuyNFT />
            </Public>
          }
        />

        <Route path="dashboard">
          <Route
            path="home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
