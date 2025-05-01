import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { styled } from "styled-components";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { createCampaignMutation, createLinkMutation, getLinksQuery } from "~/services/links";
import { Link } from "~/services/types";
import { SearchBar } from "~/components/searchbar";

import Breadcrumb from "../../components/Breadcrumb";

interface IconProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const PlatformSelector = ({
  platform,
  setPlatform,
}: {
  platform: string;
  setPlatform: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(event.target.value);
  };

  return (
    <>
      <SelectPlatform value={platform} onChange={handleChange}>
        <option value="">Select a platform</option>
        <option value="Facebook">Facebook </option>
        <option value="Google Ads">Google Ads</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Telegram">Telegram</option>
        <option value="Discord">Discord</option>
        <option value="Twitter">Twitter</option>
      </SelectPlatform>
    </>
  );
};

const platformIcon = (platform: string): string => {
  let icon: string = "/icons/camp_fb.png";
  switch (platform) {
    case "facebook":
      icon = "/icons/camp_fb.png";
      break;
    case "google ads":
      icon = "/icons/camp_GAds.png";
      break;
    case "linkedin":
      icon = "/icons/camp_linkedIn.png";
      break;
    case "telegram":
      icon = "/icons/camp_telegram.png";
      break;
    case "discord":
      icon = "/icons/camp_discord.png";
      break;
    case "twitter":
      icon = "/icons/camp_twitter.png";
      break;
    default:
      icon = "/icons/camp_link.png";
      break;
  }
  return icon;
};

const formattedDate = (dateUnformat: string): string => {
  const date = new Date(dateUnformat);

  const day = date.getDate();
  const month = date.getMonth(); // Months are zero-based in JavaScript
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = date.getFullYear();
  let hours = date.getHours();
  let period = "am";

  if (hours >= 12) {
    period = "pm";
    hours -= 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  const formattedDate = `${day} ${monthNames[month]} ${year} ${hours} ${period}`;
  return formattedDate;
};

const EmptyLinks = ({ openPopup }: { openPopup: () => void }) => (
  <LinkGeneratorSection>
    <Icon src="/icons/link_big.png" alt="Link icon" width="91px" className="icon" />
    <h2>Link Generator</h2>
    <p>Easily generate trackable links for sharing and Campaigns</p>
    {
      <NewLinkButton className="cursor-pointer" onClick={() => openPopup()}>
        <Icon src="/icons/link_round.png" alt="New link icon" width="24px" />
        <span>New Link</span>
      </NewLinkButton>
    }
  </LinkGeneratorSection>
);

const LinksTable = ({ links }: { links: Link[] }) => {
  const navigate = useNavigate();
  const pageSize = 12;
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = Math.ceil(links.length / 12);

  const visibleLinks = links.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);

  return (
    <>
      <HeaderList className="select-none">
        <LinkHeader className="flex items-center justify-center">All Links</LinkHeader>
        <SearchBar />
      </HeaderList>
      <TableContainer className="select-none">
        <table>
          <thead>
            <tr className="text-[#6B655E]">
              <TableHead style={{ width: "5%" }}>Link</TableHead>
              <TableHead style={{ width: "5%" }}>Type</TableHead>
              <TableHead style={{ width: "15%" }}>URL</TableHead>
              <TableHead style={{ width: "5%" }}>Clicks</TableHead>
              <TableHead style={{ width: "10%" }}>Campaign</TableHead>
              <TableHead style={{ width: "15%" }}>Description</TableHead>
              <TableHead style={{ width: "15%" }}>URL Target</TableHead>
              <TableHead style={{ width: "10%" }}>Date created</TableHead>
              <TableHead style={{ width: "10%" }}></TableHead>
            </tr>
          </thead>
          {visibleLinks.map((link) => (
            <tr key={link.id}>
              <TableCell style={{ width: "5%" }}>
                <SocialIcon src={platformIcon(link.campaign?.platform ?? "link")} alt="filterBy" />{" "}
              </TableCell>
              <TableCell style={{ width: "5%" }}>{link.campaign?.platform ?? "link"}</TableCell>
              <TableCell style={{ width: "15%" }}>
                <a className="underline" href={link.link} target="_blank">
                  {link.link}
                </a>
              </TableCell>
              <TableCell style={{ width: "5%" }}>
                <strong>{link.num_clicks}</strong>
              </TableCell>
              <TableCell style={{ width: "10%" }}>{link.campaign?.name}</TableCell>
              <TableCell style={{ width: "15%" }}>{link.campaign?.description}</TableCell>
              <TableCell style={{ width: "15%" }}>{link.target}</TableCell>
              <TableCell style={{ width: "10%" }}>{formattedDate(link.createdAt)}</TableCell>
              <TableCell style={{ width: "5%" }}>
                <Button
                  className="border-[#f1a34d] bg-[#f1a34d] text-white cursor-pointer"
                  onClick={() => {
                    navigate(`/links/${link.id}`);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </tr>
          ))}
        </table>
      </TableContainer>

      <Pagination>
        <PaginationLabel>
          <strong>{pageSize}</strong> per page
        </PaginationLabel>
        <PaginationDetails>
          <MenuIcon
            src="/icons/Expand_down_light.png"
            alt="arrow-left"
            onClick={() => {
              pageNumber > 1 && setPageNumber((old) => old - 1);
            }}
          />
          Page{" "}
          <strong>
            {pageNumber} of {totalPages}
          </strong>
          <MenuIcon
            src="/icons/Expand_down_right.png"
            alt="arrow-right"
            onClick={() => {
              pageNumber < totalPages && setPageNumber((old) => old + 1);
            }}
          />
        </PaginationDetails>
        <PaginationSummary>
          Showing {visibleLinks.length} of {links.length}
        </PaginationSummary>
      </Pagination>
    </>
  );
};

const NewLinkPopup = ({ isPopupOpen, closePopup }: { isPopupOpen: boolean; closePopup: () => void }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: createCampaign } = useMutation(createCampaignMutation(queryClient));
  const { mutateAsync: createLink } = useMutation(createLinkMutation(queryClient));

  const [selectedTab, setSelectedTab] = useState("Campaign");
  const [targetUrl, setTargetUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [newLink, setNewLink] = useState("");

  const resetPopupMenu = () => {
    setSelectedTab("Campaign");
    setTargetUrl("");
    setPlatform("");
    setDescription("");
    setCost(0);
    setNewLink("");
  };

  useEffect(() => {
    if (isPopupOpen) resetPopupMenu();
  }, [isPopupOpen]);

  const callAPI = async () => {
    if (selectedTab === "Campaign") {
      const newLink = await createCampaign({
        target: targetUrl,
        platform: platform,
        description,
        cost,
      });
      setNewLink(newLink.link);
    }

    if (selectedTab === "Link") {
      const newLink = await createLink({
        target: targetUrl,
      });
      setNewLink(newLink.link);
    }
  };

  return (
    <Popup
      isOpen={isPopupOpen}
      closePopup={() => {
        closePopup();
        setNewLink("");
      }}
    >
      {!newLink ? (
        <>
          <HeaderPop>
            <IconWrapper onClick={closePopup}>
              <Icon src="/icons/popCloseBtn.png" alt="API Key Icon" />
            </IconWrapper>
            <Title>Generate New Link</Title>
          </HeaderPop>
          <TabContainer>
            <StyledTab
              className={`${selectedTab === "Campaign" ? "primary" : "secondary"} cursor-pointer select-none`}
              onClick={() => setSelectedTab("Campaign")}
            >
              Campaign
            </StyledTab>
            <StyledTab
              className={`${selectedTab === "Link" ? "primary" : "secondary"} cursor-pointer select-none`}
              onClick={() => setSelectedTab("Link")}
            >
              Link
            </StyledTab>
          </TabContainer>
          {selectedTab === "Campaign" ? (
            <>
              <DescriptionStyle>Generate a link for your social media campaign.</DescriptionStyle>
              <Label>Target URL</Label>
              <Input
                type="text"
                placeholder="https://"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
              <InputHint>Where do you want to take your users?</InputHint>
              <Label>Choose Platform</Label>

              <PlatformSelector platform={platform} setPlatform={setPlatform} />
              <Label>Description</Label>
              <TextArea
                value={description}
                placeholder="Describe your campaign"
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              />
              <TextAreaFooter>
                <span>{description.length}/200</span>
              </TextAreaFooter>

              <Label>Cost</Label>
              <Input
                type="number"
                value={cost == 0 ? "" : cost}
                placeholder="Cost"
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </>
          ) : (
            <>
              <DescriptionStyle>Generate a simple link to share.</DescriptionStyle>
              <Label>Target URL</Label>

              <Input
                type="text"
                placeholder="https://"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
              <InputHint>Where do you want to take your users?</InputHint>
            </>
          )}
          <ButtonContainer className="font-montserrat flex justify-center rounded-2xl border-2 p-4 flex-1 whitespace-nowrap text-center text-base font-medium">
            <Button
              className="border-[#b9b4ae] bg-white text-[#aea79f] cursor-pointer select-none"
              onClick={closePopup}
            >
              Cancel
            </Button>
            <Button
              className="border-[#f1a34d] bg-[#f1a34d] text-white cursor-pointer select-none"
              onClick={() => callAPI()}
            >
              Generate Link
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <PageContainer>
          <TitleNew>Link Generated</TitleNew>
          <CampaignImage src="/icons/successImage.png" alt="Campaign" />
          <Heading>Hurray!</Heading>
          <DescriptionNew>
            Your Campaign Link has been successfully generated, you can now share the link on your social channels.
          </DescriptionNew>
          <CampaignLinkSection>
            <CampaignLink>{newLink}</CampaignLink>
            <CopyButton
              src="/icons/copyButton.png"
              alt="Copy Link"
              title="Copy Link"
              onClick={() => {
                navigator.clipboard.writeText(newLink);
              }}
            />
          </CampaignLinkSection>
          <GenerateNewLink
            onClick={() => {
              resetPopupMenu();
            }}
          >
            Generate new Link
          </GenerateNewLink>
          <GoToDashboard
            onClick={() => {
              closePopup();
              resetPopupMenu();
            }}
          >
            Go to link dashboard
          </GoToDashboard>
        </PageContainer>
      )}
    </Popup>
  );
};

export const Component = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { data: links } = useQuery(getLinksQuery());

  const breadcrumbItems = [
    { url: "dashboard", label: "Overview", active: false },
    { url: "links", label: "Links", active: true },
  ];

  return (
    <AnalyticsContainer>
      <Header>
        <Breadcrumb items={breadcrumbItems} />
        {
          <NewLinkButton onClick={() => setPopupOpen(true)} className="cursor-pointer select-none">
            <Icon src="/icons/link_round.png" alt="New link icon" width="24px" />
            <span>New Link</span>
          </NewLinkButton>
        }
      </Header>

      {!links?.length ? <EmptyLinks openPopup={() => setPopupOpen(true)} /> : <LinksTable links={links} />}

      <NewLinkPopup isPopupOpen={isPopupOpen} closePopup={() => setPopupOpen(false)} />
    </AnalyticsContainer>
  );
};

const AnalyticsContainer = styled.div`
  border-radius: 16px 16px 0 0;
  background-color: var(--Background-1, #fdfaf7);
  padding: 20px 20px 80px;
  height: 100%;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const NewLinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 200px;
  border: 4px solid rgba(254, 244, 233, 1);
  background-color: var(--Primary-100, #f1a34d);
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  padding: 8px;
`;

const LinkGeneratorSection = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center; // Add this line to center the content vertically
  border-radius: 12px;
  box-shadow: 0 0 40px 0 rgba(158, 125, 88, 0.08);
  background-color: #fff;
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  padding: 9px 40px 150px;

  h2 {
    color: #6a6055;
    margin-top: 30px;
    font:
      700 24px/83% Montserrat,
      sans-serif;
  }

  p {
    color: #9b958f;
    margin-top: 17px;
    font:
      16px Montserrat,
      sans-serif;
  }

  ${NewLinkButton} {
    margin-top: 30px;
    width: 123px;
    max-width: 100%;
  }

  .icon {
    margin-top: 139px;

    @media (max-width: 991px) {
      margin-top: 40px;
    }
  }

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

//popup styles

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
}

// Popup component
const Popup: React.FC<PopupProps> = ({ isOpen, closePopup, children }) => {
  // Prevent rendering if not open
  if (!isOpen) return null;

  return (
    <PopupBackground onClick={closePopup} className="select-none">
      <PopupContainer onClick={(e) => e.stopPropagation()}>{children}</PopupContainer>
    </PopupBackground>
  );
};

// Styled component for the popup background
const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 999;
`;

// Styled component for the popup itself
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;
  border-radius: 12px;
  box-shadow: 0px 0px 100px 0px rgba(158, 125, 88, 0.12);
  background-color: #fff;
  display: flex;
  max-width: 450px;
  flex-direction: column;
  padding: 37px 30px;
`;

const HeaderPop = styled.header`
  justify-content: space-between;
  align-self: start;
  display: flex;
  gap: 20px;
`;

const IconWrapper = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #faf7f5;
  display: flex;
  width: 42px;
  height: 42px;
  padding: 0 8px;
`;

const Title = styled.h2`
  color: var(--Font-Black-100, #242b36);
  text-align: center;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font:
    600 18px Montserrat,
    sans-serif;
`;

// const StyledButton = styled.a`
//   font-family: Montserrat, sans-serif;
//   justify-content: center;
//   border-radius: 12px;
//   border: 2px solid;
//   padding: 17px 16px;
//   flex: 1;
//   white-space: nowrap;
//   text-align: center;
//   font-size: 16px;
//   font-weight: 500;

//   &.primary {
//     border-color: #f1a34d;
//     background-color: #f1a34d;
//     color: #fff;
//   }

//   &.secondary {
//     border-color: #b9b4ae;
//     color: #b9b4ae;
//   }
// `;

const TabContainer = styled.div`
  justify-content: center;
  border-radius: 12px;
  background-color: #f8f4ef;
  display: flex;
  margin-top: 27px;
  gap: 6px;
  font-size: 14px;
  padding: 6px;
`;

const DescriptionNew = styled.p`
  color: #b9b4ae;
  text-align: center;
  margin-top: 12px;
  width: 100%;
  font-size: 14px;
  line-height: 24px;
`;

const Label = styled.label`
  color: #5e6366;
  margin-top: 23px;
  width: 100%;
  font-size: 12px;
`;

const InputHint = styled.div`
  color: #abafb1;
  margin-top: 4px;
  width: 100%;
  font-size: 12px;
`;

const TextArea = styled.textarea`
  border-radius: 8px;
  background-color: rgba(246, 242, 238, 0.6); /* --Input-Default-Bg */
  color: #abafb1; /* --Black-2 */
  padding: 15px;
  font:
    400 16px "Inter",
    sans-serif;
  margin-top: 4px;
  min-height: 93px;
  font-family: Inter, sans-serif;
  border: none;
  outline: none;

  &:focus {
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid rgba(241, 163, 77, 1);
    background-color: #fbf6f1;
    justify-content: center;
    color: #5e6366;
    white-space: nowrap;
  }
`;

const TextAreaFooter = styled.div`
  display: flex;
  margin-top: 4px;
  width: 100%;
  padding-right: 20px;
  gap: 4px;
  font-size: 12px;
  color: #abafb1;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 40px;
  gap: 20px;
`;

const StyledTab = styled.div`
  font-family: Montserrat, sans-serif;
  justify-content: center;
  border-radius: 12px;

  padding: 8px 16px;
  flex: 1;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  &.primary {
    background-color: #f1a34d;
    color: #fff;
  }

  &.secondary {
    background-color: #fff;
    color: #aea79f;
  }
`;

const Input = styled.input`
  border-radius: 8px;
  background-color: rgba(246, 242, 238, 0.6); /* --Input-Default-Bg */
  color: #abafb1; /* --Black-2 */
  padding: 15px;
  font-size: 16px;
  font-family: Inter, sans-serif;
  border: none;
  outline: none;

  &:focus {
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid rgba(241, 163, 77, 1);
    background-color: #fbf6f1;
    justify-content: center;
    color: #5e6366;
    white-space: nowrap;
    padding: 15px 16px;
    font:
      400 16px "Inter",
      sans-serif;
  }
`;

// sucess popup styles

const PageContainer = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  max-width: 390px;
`;

const TitleNew = styled.h1`
  color: var(--Font-Black-100, #242b36);
  font:
    600 18px Montserrat,
    sans-serif;
  text-align: center;
`;

const CampaignImage = styled.img`
  aspect-ratio: 1;
  margin-top: 27px;
  max-width: 100%;
  object-fit: auto;
  object-position: center;
  width: 166px;
`;

const Heading = styled.h2`
  color: var(--Font-Black-100, #242b36);
  font:
    600 40px Montserrat,
    sans-serif;
  margin-top: 27px;
  text-align: center;
`;

const DescriptionStyle = styled.p`
  color: #706b65;
  font:
    16px/25px Montserrat,
    sans-serif;
  margin-top: 32px;
  text-align: center;
`;

const CampaignLinkSection = styled.section`
  background-color: var(--Background-1, #fdfaf7);
  border-radius: 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 32px;
  padding: 8px;
  white-space: nowrap;
  width: 100%;
`;

const CampaignLink = styled.p`
  color: #706b65;
  font:
    16px/156% Montserrat,
    sans-serif;
  text-align: center;
`;

const GenerateNewLink = styled.button`
  align-self: stretch;
  background-color: var(--Primary-100, #f1a34d);
  border: 8px solid rgba(241, 163, 77, 0);
  border-radius: 12px;
  color: #fff;
  font:
    500 16px Montserrat,
    sans-serif;
  justify-content: center;
  margin-top: 27px;
  padding: 17px 16px;
  text-align: center;
`;

const GoToDashboard = styled.a`
  align-self: stretch;
  color: var(--Font-40, #b9b4ae);
  font:
    16px/156% Montserrat,
    sans-serif;
  margin-top: 27px;
  text-align: center;
  width: 100%;
`;

const SelectPlatform = styled.select`
  border-radius: 8px;
  background-color: rgba(246, 242, 238, 0.6);
  color: #abafb1;
  padding: 15px;
  font-size: 16px;
  font-family: Inter, sans-serif;
  border: none;
  outline: none;

  &:focus {
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid rgba(241, 163, 77, 1);
    background-color: #fbf6f1;
    justify-content: center;
    color: #5e6366;
    white-space: nowrap;
    padding: 15px 16px;
    font:
      400 16px "Inter",
      sans-serif;
  }
`;

// Styled components for the header list
const HeaderList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 12px;
  margin-top: 20px;
`;

const LinkHeader = styled.h2`
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #6a6055;
  padding: 6px;
`;

const Pagination = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-color: "#ABAFB1";
`;

const PaginationLabel = styled.span`
  flex: 1;
`;

const PaginationDetails = styled.span`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: column;
  gap: 8px;
`;

const PaginationSummary = styled.span`
  flex: 1;
  text-align: right;
`;

const MenuIcon = styled.img`
  width: 20px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 12px;
  tr {
    height: 45px;
    padding: 8px 16px;
  }
`;

const TableHead = styled.th`
  text-align: left;
`;

const TableCell = styled.td`
  flex: 1;
  fontfamily: monserrat, sans-serif;
  font-size: 14px;
  color: #6b655e;
`;

const SocialIcon = styled.img`
  width: 24px;
`;

const CopyButton = styled.img`
  width: 24px;
  cursor: pointer;
`;
