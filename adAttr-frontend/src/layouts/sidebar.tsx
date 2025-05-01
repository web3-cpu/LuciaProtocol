import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const MenuSectionData = [
  { url: "dashboard", id: "overview", label: "Overview", imgSrc: "/icons/fi_pie-chart.svg", alt: "Overview Icon" },
  {
    url: "analytics",
    id: "analytics",
    label: "Analytics",
    imgSrc: "/icons/u_create-dashboard.svg",
    alt: "Overview Icon",
  },
  {
    url: "/",
    id: "connectedAds",
    label: "Connected Ads",
    imgSrc: "/icons/fi_star_outlined.svg",
    alt: "Connected Ads Icon",
    upcoming: true,
  },
  { url: "/", id: "domains", label: "Domains", imgSrc: "/icons/fi_globe.svg", alt: "Domains Icon", upcoming: true },
  { url: "links", id: "links", label: "Links", imgSrc: "/icons/fi_link.svg", alt: "Domains Icon" },
  {
    url: "/",
    id: "teamMembers",
    label: "Team Members",
    imgSrc: "/icons/fi_users_outlined.svg",
    alt: "Team Members Icon",
    upcoming: true,
  },
  {
    url: "/",
    id: "messages",
    label: "Messages",
    imgSrc: "/icons/fi_envelop.svg",
    alt: "Messages Icon",
    upcoming: true,
  },
  {
    url: "/",
    id: "aiChatBot",
    label: "Lucia AI Chat Bot",
    imgSrc: "/icons/fi_comment.svg",
    alt: "AI Chat Bot Icon",
    upcoming: true,
  },
  {
    url: "integrations",
    id: "integrations",
    label: "Integrations",
    imgSrc: "/icons/fi_bag.svg",
    alt: "Integrations Icon",
  },
  {
    url: "/",
    id: "helpCenter",
    label: "Help Center",
    imgSrc: "/icons/fi_headset.svg",
    alt: "Help Center Icon",
    upcoming: true,
  },
  { url: "/", id: "settings", label: "Settings", imgSrc: "/icons/fi_gear.svg", alt: "Settings Icon", upcoming: true },
  { url: "/", id: "logout", label: "Logout", imgSrc: "/icons/fi_logout.svg", alt: "Logout Icon" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    queryClient.clear();
  };

  const handleClick = (url: string, id: string) => {
    if (id === "logout") {
      handleLogout();
    }

    navigate(url);
  };

  return (
    <Nav>
      {MenuSectionData.map((section) => (
        <MenuItem
          key={section.id}
          $active={location.pathname === `/${section.url}`}
          $disabled={section.url === "/" && section.id !== "logout"}
          onClick={() => handleClick(section.url, section.id)}
        >
          <MenuIcon src={section.imgSrc} alt={section.alt} />
          <MenuLabel>{section.label}</MenuLabel>
          {section.upcoming && <Badge>Upcoming</Badge>}
        </MenuItem>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0px 14px;
  color: rgba(36, 43, 54, 0.8);
  font-weight: 400;
  line-height: 154%;
  font-size: 13px;
  width: 240px;
`;

const MenuItem = styled.div<{ $disabled: boolean; $active: boolean }>`
  background-color: ${({ $active, $disabled }) => ($active && !$disabled ? "#fcefe1" : "transparent")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-top: 12px;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "all")};
  font-weight: ${({ $active, $disabled }) => ($active && !$disabled ? "700" : "inherit")};

  &:hover {
    border-radius: 8px;
    background-color: #fcefe1;
    display: flex;
    font-size: 13px;
    white-space: nowrap;
    cursor: pointer;
  }

  &:active {
    background-color: #e0e0e0; // Change this to the desired active background color
  }
`;

const MenuIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const MenuLabel = styled.p`
  margin-left: 11px;
  font-family: Montserrat, sans-serif;
  white-space: nowrap;
`;

const Badge = styled.span`
  margin-left: 4px;
  background-color: #f1a34d;
  color: white;
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 100px;
`;

export default Sidebar;
