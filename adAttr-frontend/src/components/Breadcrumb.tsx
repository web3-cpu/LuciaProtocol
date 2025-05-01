import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface BreadcrumbProps {
  items: { url: string; label: string; active: boolean }[]; // Array of breadcrumb items
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="breadcrumb</nav>">
      <BreadcrumbList>
        <MenuIcon src="/icons/u_arrow-left.png" alt="back-arrow" />
        {items.map((item, index) => (
          <BreadcrumbItem key={index} itemScope itemType="http://schema.org/BreadcrumbList">
            {index > 0 && <Separator className="text-[#242B36]">/</Separator>}
            <BreadcrumbLink
              onClick={() => {
                navigate(`/${item.url}`);
              }}
              itemProp="item"
              disabled={item.active}
            >
              {item.label}
            </BreadcrumbLink>
            <meta itemProp="position" content={`${index + 1}`} />
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </nav>
  );
};

const MenuIcon = styled.img`
  width: 20px;
`;

const Separator = styled.span`
  margin: 0 4px;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`;

const BreadcrumbItem = styled.li`
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const BreadcrumbLink = styled.button`
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
  }

  &[disabled] {
    pointer-events: none;
    color: #999;
  }
`;

export default Breadcrumb;
