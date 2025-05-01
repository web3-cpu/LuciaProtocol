import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Button from "~/components/button";

import useStore from "../store";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AvatarDropdown ref={dropdownRef}>
      <Button
        onClick={() => toggleDropdown()}
        variant="link"
        Icon={
          <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb3961c1d4f594a9f0b6825e1b34124e78cecf614d1b6ff2694e539413b34f93?apiKey=e1d604d4eed341a6a7af82f9215bc1f2&" />
        }
      />
      {isOpen && (
        <DropdownMenu>
          <Link to="/profile" className="text-black">
            Profile
          </Link>
        </DropdownMenu>
      )}
    </AvatarDropdown>
  );
};

const PrivateHeader = () => {
  const store = useStore();
  const user = store.authUser;
  console.log("user:", user);

  return (
    <Header>
      <HeaderContents>
        <Nav>
          <Link to="/dashboard" className="text-ct-dark-600">
            <img src={`/logo_heading.png`} alt={`LOGO`} height="100" width="200" />
          </Link>
        </Nav>
        <ActionGroup>
          <Icons>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/01379156397404425388992e803e956aa2b8e3ba3ea2697bd4629b052940b3ed?apiKey=e1d604d4eed341a6a7af82f9215bc1f2&" />
            <ProfileDropDown />
          </Icons>
        </ActionGroup>
      </HeaderContents>
    </Header>
  );
};

const Header = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 18px 20px;
`;

const HeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const ActionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 991px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 16px;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const AvatarDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px 20px;
`;

export default PrivateHeader;
