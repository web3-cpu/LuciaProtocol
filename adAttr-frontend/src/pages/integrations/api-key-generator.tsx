import { useState } from "react";
import { styled } from "styled-components";

const ApiKeyGenerator: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [sucessAPI, setsucessAPI] = useState(false);
  const [apiKey, setLocalApiKey] = useState("");

  const callAPIKey = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch((import.meta.env.VITE_SERVER_ENDPOINT as string) + "/api/key/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    const api = await response.json();
    // setApiKey(api.key);
    setLocalApiKey(api.key);
    setsucessAPI(true);
  };

  return (
    <>
      <section className="self-stretch rounded-lg bg-white flex flex-col justify-center p-4">
        <div className="flex flex-row gap-3 justify-between">
          <div className="flex flex-row gap-2.5 items-start justify-start flex-grow">
            <Image src="/icons/APIKEY_ico.png" alt="Lucia SDK" style={{ width: "43px" }} />
            <div>
              <Heading>Lucia SDK API Key </Heading>
              <DocumentationLink href="https://docs.clickinsights.xyz" target="_blank">
                <span>View Documentation</span>
                <Image src="/icons/u_angle-right-b.png" alt="Documentation icon" style={{ width: "20px" }} />
              </DocumentationLink>
            </div>
          </div>

          {apiKey && (
            <div className="flex gap-3 my-auto">
              <div className="flex items-center gap-2 text-sm text-[#32936f] font-normal whitespace-normal md:whitespace-nowrap">
                <span>Connected</span>
                <img className="w-5 h-5" src="/icons/check_ring.png" alt="Connection status icon" />
              </div>
              <div className="flex items-center gap-2 font-medium whitespace-normal md:whitespace-nowrap">
                <span className="text-[#242b36] text-[12px] leading-[167%] font-montserrat">Status</span>
                <span className="text-[#32936f] text-[13px] leading-[154%] font-montserrat">Active</span>
              </div>
              <ApiKeyWrapper>
                <span className="flex-grow-1 font-montserrat">{apiKey}</span>
                <img
                  className="w-6 h-6"
                  src="/icons/copyButton.png"
                  alt="Copy API key"
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                  }}
                />
              </ApiKeyWrapper>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-[#b9b4ae] text-[14px] mt-3">
            With Lucia SDK API Key, you can easily connect to Lucia Services and track your service connection.
          </p>
          <GenerateApiKeyButton onClick={() => setPopupOpen(true)}>
            <img className="w-4 h-4 object-cover" src="/icons/APIKEY_ico_black.png" alt="connect_api" loading="lazy" />
            Generate API Key
          </GenerateApiKeyButton>
        </div>
      </section>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => {
          setPopupOpen(false);
          setsucessAPI(false);
        }}
      >
        {!sucessAPI ? (
          <>
            <div className="flex gap-5">
              <div
                className="cursor-pointer flex justify-center rounded-lg bg-[#faf7f5] w-10 h-10 p-1"
                onClick={() => setPopupOpen(false)}
              >
                <Icon src="/icons/popCloseBtn.png" alt="API Key Icon" />
              </div>
              <h2 className="text-[#242b36] text-[18px] font-montserrat mt-2">New API Key</h2>
            </div>

            <p className="text-[#b9b4ae] text-[14px] mt-7">
              With Lucia SDK API Key, you can easily connect to Lucia Services and track your service connection.
            </p>

            <ConfigureSection>
              <div className="flex justify-between gap-5">
                <h3 className="font-inter">How to Configure Lucia SDK API Key</h3>
                <Icon src="/icons/Arrow_DownCircle.png" alt="Configure Icon" />
              </div>
            </ConfigureSection>

            <NoteSection>
              <NoteHeader>
                <NoteIcon>!</NoteIcon>
                <NoteTitle>Please note</NoteTitle>
              </NoteHeader>
              <NoteContent>
                You can only generate 1 (One) API key per account.
                <br />
                Regenerating an API Key will override the already existing API Key and you will need to reconfigure your
                servers to accept the new API Key.
                <br />
                Do not regenerate an API Key if you don't want to modify the current API key
              </NoteContent>
            </NoteSection>
            <div className="flex justify-between mt-7 gap-5">
              <Button variant="secondary" onClick={async () => setPopupOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={callAPIKey}>
                Generate API Key
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h2 className="text-[#242b36] text-[18px] font-semibold">API Key Generated</h2>
              <img className="w-[166px] my-7 mx-auto max-w-full" src="/icons/successImage.png" alt="Success" />
              <h1 className="text-[#242b36] text-[40px] font-semibold mt-6">Hurray!</h1>
              <p className="text-[#706b65] text-[14px] mt-3 text-center">
                Your API Key has been successfully generated, you can now configure your servers with the API Key below
              </p>
              <APIKeyContainer>
                <span className="flex-grow-1">{apiKey}</span>
                <img
                  className="w-6 h-6 cursor-pointer"
                  src="/icons/copyButton.png"
                  alt="Copy API Key"
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                  }}
                />
              </APIKeyContainer>
              <DashboardLink
                onClick={() => {
                  setPopupOpen(false);
                  setsucessAPI(false);
                }}
              >
                Go to API dashboard
              </DashboardLink>
            </div>
          </>
        )}
      </Popup>
    </>
  );
};

const ApiKeyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 12px;
  background-color: var(--background-1, #fdfaf7);
  font-size: 16px;
  color: #706b65;
  font-weight: 400;
  line-height: 156%;
  flex-grow: 1;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

// POPUP Success Styles

const APIKeyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: #fdfaf7;
  margin-top: 32px;
  padding: 8px 9px;
  gap: 10px;
  color: #706b65;
  line-height: 156%;
`;

const DashboardLink = styled.a`
  color: #b9b4ae;
  text-align: center;
  margin-top: 27px;
  display: block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// POPUP Styles
interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
}

// Popup component
const Popup: React.FC<PopupProps> = ({ isOpen, closePopup, children }) => (
  <PopupBackground isOpen={isOpen} onClick={closePopup}>
    <PopupContainer onClick={(e) => e.stopPropagation()}>{children}</PopupContainer>
  </PopupBackground>
);

// Styled component for the popup background
const PopupBackground = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
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

const ConfigureSection = styled.section`
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(247, 241, 235, 1);
  background-color: #fff;
  display: flex;
  margin-top: 40px;
  width: 100%;
  flex-direction: column;
  font-size: 13px;
  color: var(--Font-Black-100, #242b36);
  font-weight: 600;
  line-height: 146%;
  padding: 24px;
`;

const NoteSection = styled.section`
  justify-content: center;
  border-radius: 16px;
  background-color: var(--Background-1, #fdfaf7);
  display: flex;
  margin-top: 16px;
  width: 100%;
  flex-direction: column;
  font-size: 10px;
  padding: 20px;
`;

const NoteHeader = styled.header`
  align-self: start;
  display: flex;
  gap: 8px;
  font-weight: 600;
`;

const NoteIcon = styled.div`
  font-family: Inter, sans-serif;
  justify-content: center;
  align-items: center;
  border-radius: 500px;
  background-color: #fff;
  color: var(--Primary-100, #f1a34d);
  white-space: nowrap;
  line-height: 190%;
  width: 15px;
  height: 15px;
  margin: auto 0;
  padding: 0 7px;
`;

const NoteTitle = styled.h4`
  color: var(--Font-Black-100, #242b36);
  font-family: Inter, sans-serif;
  line-height: 19px;
`;

const NoteContent = styled.p`
  color: #706b65;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 19px;
  margin-top: 8px;
`;

interface IconProps {
  src: string;
  alt: string;
}

const Icon: React.FC<IconProps> = ({ src, alt }) => {
  return <StyledIcon src={src} alt={alt} loading="lazy" />;
};

const StyledIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 26px;
`;

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ variant: "primary" | "secondary" }>`
  font-family: Montserrat, sans-serif;
  justify-content: center;
  border-radius: 12px;
  flex-grow: 1;
  padding: 17px 16px;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;

  ${({ variant }) =>
    variant === "primary" &&
    `
      border: none;
      background-color: var(--Primary-100, #f1a34d);
      color: #fff;

      // Styles for when the button is pressed
      &:active {
        background-color: var(--Primary-Active, #c8832d);
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      border: 2px solid rgba(185, 180, 174, 1);
      background-color: transparent;
      color: var(--Font-40, #b9b4ae);

      // Styles for when the button is pressed
      &:active {
        background-color: var(--Primary-100, #f1a34d);
        color: #fff;
      }
    `}
`;

const Image = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
`;

const Heading = styled.h2`
  color: #6a6055;
  font-weight: 500;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 4px;
`;

const DocumentationLink = styled.a`
  color: #f1a34d;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const GenerateApiKeyButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 6px 16px;
  background-color: #f6f2ed;
  cursor: pointer;
  border-radius: 8px;
  border: 4px solid rgba(83, 83, 83, 0.12);
  margin-button: "20px";
  color: #242b36;
`;

export default ApiKeyGenerator;
