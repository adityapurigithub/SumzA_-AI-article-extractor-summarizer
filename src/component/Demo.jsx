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

        {/* Browse URl History...the urls we have used or seen... */}
      </div>

      {/*Display Results */}
    </section>
  );
};

export default Demo;
