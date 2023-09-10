import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import s from "./Styles/UI.module.css";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import { FiMapPin, FiMail, FiTwitter } from "react-icons/fi";
import { MdBusiness } from "react-icons/md";

export const Ui = () => {
  const [UserName, setUserName] = useState("ayusht777");
  const [Data, setData] = useState(null);
  const [toggleError, setToggleError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("Github SearchX");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 100);
      console.log(setFullText);
    }
  }, [index]);

  useEffect(() => {
    setIsLoading(true);
    const callApi = async () => {
      await axios
        .get(`https://api.github.com/users/${UserName}`)
        .then((res) => {
          setData(res?.data);
          setToggleError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, "011");

          setToggleError(true);
          setIsLoading(false);
        });
    };
    callApi();
  }, [UserName]);
  console.log(UserName, Data);
  const getName = (n) => {
    setUserName(n);
  };
  return (
    <div className={s.Box}>
      <div className={s.title}>{text}</div>
      <SearchBar toactive={toggleError} setName={getName} />

      <div className={s.userData}>
        {IsLoading && <img src={spinner} alt="" className={s.loadingSpinner} />}
        <div className={s.top}>
          <div className={s.left}>
            <img src={Data?.avatar_url} alt="" />
          </div>
          <div className={s.right}>
            <div className={s.parts}>
              <h2>{Data?.name ?? "Name is Not Available"}</h2>
            </div>
            <div className={s.parts}>
              {" "}
              <p>{"@" + Data?.login}</p>
            </div>
            <div className={s.parts}>
              <p>{Data?.bio ?? "This Profile Has No Bio"}</p>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.repos}>
            <a target="_blank" rel="noopener noreferrer" href={Data?.html_url}>
              <button>
                <h1>{Data?.public_repos || 0}</h1>
                <p>{"Repo's"}</p>
              </button>
            </a>

            <a href="#">
              <button>
                <h1>{Data?.followers}</h1>
                <p>Followers</p>
              </button>
            </a>

            <a href="#">
              <button>
                <h1>{Data?.following}</h1>
                <p>Following</p>
              </button>
            </a>
          </div>
          <div className={s.info}>
            <div className={s.location}>
              <FiMapPin></FiMapPin>
              <p>{Data?.location ??"Not Available"}</p>
            </div>
            <div className={s.email}>
              <FiMail></FiMail>
              <p>{Data?.email ??"Not Available"}</p>
            </div>
            <div className={s.twitter}>
              <FiTwitter></FiTwitter>
              <p>
                {Data?.twitter_username ?? "Not Available"}
              </p>
            </div>
            <div className={s.company}>
              <MdBusiness></MdBusiness>
              <p>{Data?.company ??"Not Available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
