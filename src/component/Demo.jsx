import React, { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";

// hook we get from the redux took kit by creating end points...........
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  // for storing history of links...
  const [allArticle, setAllArticle] = useState([]);

  // for copy purpose..
  const [copyLink, setCopyLink] = useState("");

  //the breakdown of below hook... [_endpoint_function_to_call_API,{state_err,state_isFetching}]=_hook()_;

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // using useEffect for gettin the history of all articles-links....
  useEffect(() => {
    const getArticlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (getArticlesFromLocalStorage) {
      setAllArticle(getArticlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // api call to ai gpt based API.... getting the data out of it................
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updateAllArticle = [newArticle, ...allArticle];

      setArticle(newArticle);

      setAllArticle(updateAllArticle);

      localStorage.setItem("articles", JSON.stringify(updateAllArticle));
    }
  };

  // sunction for copying the summery...
  const handleCopy = (copyUrl) => {
    setCopyLink(copyUrl);

    navigator.clipboard.writeText(copyUrl); //for copying the text....remeber..

    setTimeout(() => {
      setCopyLink("");
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} className="absolute left-2" alt="" />
          <input
            type="url"
            className="url_input peer"
            placeholder="Enter Url...."
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
          />
          {/* here peer class is used when we want to style-sibling & accordingly like on focus hover and like that */}
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-500  peer-focus:bg-gray-200  peer-focus:text-blue-500"
          >
            ↲
          </button>
          {/* when we focus on peer-class element the btn above will get styled accordingly.. */}
        </form>

        {/* Browse URL History...the urls we have used or seen... */}
        {allArticle.length !== 0 && (
          <div className="flex flex-col max-h-60 overflow-y-auto w-[90%] m-auto">
            <h2 className="font-bold text-xl text-center my-4">
              Previously Visited Links...
            </h2>
            {allArticle.map((article, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className="link_card "
              >
                <div
                  className="copy_btn"
                  onClick={() => handleCopy(article.url)}
                >
                  <img
                    src={copyLink === article.url ? tick : copy}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-400 text-sm font-semibold truncate ">
                  {article.url}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*Display Results */}
      <div className="my-10 flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-bold text-center ">
            Well, that wasn't suppose to happen..!!! <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-bold text-xl text-center">
                Article <span className="blue_gradient">Summary...</span>
              </h2>
              <div className="summary_box text-justify">
                <p className="font-inter font-medium text-sm text-gray-700 leading-2">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
