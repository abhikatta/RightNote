import { auth } from "../../Firebase/firebase";
import DarkThemeIcon from "../../icons/DarkThemeIcon";
import LightThemeIcon from "../../icons/LightThemeIcon";
import SideBarIcon from "../../icons/SideBarIcon";
import SpotifyEmbedIcon from "../../icons/SpotifyEmbedIcon";

const CoolNavBar = ({
  theme,
  spotifyEmbed,
  toggleSideBar,
  sideBar,
  handleSpotifyEmbed,
  toggleTheme,
  userID,
}) => {
  return (
    <>
      <div title={`Toggle side bar ${sideBar ? "off" : "on"}`}>
        <SideBarIcon onClick={toggleSideBar} sideBar={sideBar} theme={theme} />
      </div>
      <div title={`Turn on ${theme === "light" ? "dark" : "light"} mode`}>
        {theme === "light" ? (
          <LightThemeIcon onClick={toggleTheme} theme={theme} />
        ) : (
          <DarkThemeIcon onClick={toggleTheme} theme={theme} />
        )}
      </div>
      <div title={`Toggle spotify player ${spotifyEmbed ? "off" : "on"}`}>
        <SpotifyEmbedIcon
          toggledOff={spotifyEmbed}
          onClick={handleSpotifyEmbed}
          theme={theme}
        />
      </div>

      <div>
        <p
          title="Your username"
          className={`text-center rounded-lg px-3 py-2 hover:cursor-pointer              
            ${theme === "dark" ? "text-slate-900 " : "text-slate-700 "}
            `}>
          {userID && userID.displayName
            ? userID.displayName
            : userID.email.split("@")[0]}
        </p>
      </div>
      <div>
        <button
          title="Logout of the current account"
          className={`text-center rounded-lg px-3 py-2 hover:cursor-pointer              
              hover:scale-110 duration-200 transition-transform
                  text-slate-200 bg-slate-800
            `}
          onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default CoolNavBar;
