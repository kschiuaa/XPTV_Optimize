// ==UserScript==
// @name         Forward VOD Widget (Optimized)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Enhanced VOD widget with traditional Chinese conversion
// @author       Original: bemarkt, Enhanced: Ti
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js
// ==/UserScript==

var WidgetMetadata = {
  id: "ti.bemarkt.vod.maccms",
  title: "VOD2",
  description: "VOD",
  author: "Ti",
  site: "https://github.com/bemarkt/scripts/tree/master/provider/Forward",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "獲取影片列表",
      description: "根據API地址、分類、頁碼等參數獲取影片列表。",
      requiresWebView: false,
      functionName: "getVodList",
      params: [
        {
          name: "apiUrl",
          title: "影片源地址",
          type: "input",
          description:
            "當前僅支持蘋果CMS的JSON API地址 (例如: https://example.com/api.php/provide/vod/)",
          value: "https://api.wwzy.tv/api.php/provide/vod/",
          placeholders: [
            {
              title: "極速資源",
              value: "https://jszyapi.com/api.php/provide/vod/",
            },
            {
              title: "木耳資源",
              value: "https://json02.heimuer.xyz/api.php/provide/vod/",
            },
            {
              title: "蝦米資源",
              value: "https://gctf.tfdh.top/api.php/provide/vod/",
            },
            {
              title: "魔抓資源",
              value: "https://mozhuazy.com/api.php/provide/vod/",
            },
            {
              title: "無盡資源",
              value: "https://api.wujinapi.me/api.php/provide/vod/",
            },
            {
              title: "金鷹資源",
              value: "https://jyzyapi.com/provide/vod/from/jinyingm3u8/at/json",
            },
            {
              title: "旺旺短劇",
              value: "https://api.wwzy.tv/api.php/provide/vod/",
            },
            {
              title: "量子資源",
              value: "https://cj.lziapi.com/api.php/provide/vod/at/json/",
            },
            {
              title: "貓咪資源",
              value: "http://zy.xiaomaomi.cc/api.php/provide/vod/",
            },
            {
              title: "臥龍資源",
              value: "https://collect.wolongzy.cc/api.php/provide/vod/",
            },
            {
              title: "無憂資源",
              value: "https://www.wyvod.com/api.php/provide/vod/",
            },
            {
              title: "如意資源",
              value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/",
            },
            {
              title: "九零資源",
              value: "https://oknnews.com/api.php/provide/vod/",
            },
            {
              title: "含羞資源",
              value: "https://api.souavzy.vip/api.php/provide/vod/",
            },
            {
              title: "玉兔資源",
              value: "https://apiyutu.com/api.php/provide/vod/",
            },
            {
              title: "魔抓資源",
              value: "https://mozhuazy.com/api.php/provide/vod/",
            },
            {
              title: "豆瓣資源",
              value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/",
            },
            {
              title: "搜诶微",
              value: "https://api.souavzy.vip/api.php/provide/vod/",
            },
            {
              title: "阿里資源",
              value: "https://alivod.com/api.php/provide/vod/",
            },
            {
              title: "LSP",
              value: "https://apilsbzy1.com/api.php/provide/vod",
            },
            {
              title: "先鋒資源",
              value: "http://60.204.225.89:1122/api.php/provide/vod/",
            },
          ],
        },
        {
          name: "t",
          title: "類別ID",
          type: "input",
          description: "影片分類ID (可留空)",
          value: "",
        },
        {
          name: "pg",
          title: "頁碼",
          type: "page",
          value: "1",
        },
        {
          name: "h",
          title: "最近幾小時內",
          type: "input",
          description: "獲取最近幾小時內更新的內容 (例如: 24，可留空)",
          value: "",
        },
      ],
    },
  ],
  search: {
    title: "搜尋影片",
    functionName: "searchVod",
    params: [
      {
        name: "apiUrl",
        title: "影片源地址",
        type: "input",
        description:
          "當前僅支持蘋果CMS的JSON API地址 (例如: https://example.com/api.php/provide/vod/)",
        value: "https://api.wwzy.tv/api.php/provide/vod/",
        placeholders: [
          {
            title: "扶風資源",
            value: "http://60.204.225.89:1122/api.php/provide/vod/",
          },
          {
            title: "極速資源",
            value: "https://jszyapi.com/api.php/provide/vod/",
          },
          {
            title: "蝦米資源",
            value: "https://zy.hls.one/api.php/provide/vod/",
          },
          {
            title: "魔抓資源",
            value: "https://mozhuazy.com/api.php/provide/vod/",
          },
          {
            title: "旺旺短劇",
            value: "https://api.wwzy.tv/api.php/provide/vod/",
          },
          {
            title: "量子資源",
            value: "https://cj.lziapi.com/api.php/provide/vod/at/json/",
          },
          {
            title: "如意資源",
            value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/",
          },
          {
            title: "九零資源",
            value: "https://oknnews.com/api.php/provide/vod/",
          },
          {
            title: "貓咪資源",
            value: "http://zy.xiaomaomi.cc/api.php/provide/vod/",
          },
          {
            title: "豆瓣資源",
            value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/",
          },
          {
            title: "含羞資源",
            value: "https://api.souavzy.vip/api.php/provide/vod/",
          },
          {
            title: "阿里資源",
            value: "https://alivod.com/api.php/provide/vod/",
          },
          {
            title: "臥龍資源",
            value: "https://collect.wolongzy.cc/api.php/provide/vod/",
          },
          {
            title: "無憂資源",
            value: "https://www.wyvod.com/api.php/provide/vod/",
          },
          {
            title: "玉兔資源",
            value: "https://apiyutu.com/api.php/provide/vod/",
          },
          {
            title: "先鋒資源",
            value: "http://60.204.225.89:1122/api.php/provide/vod/",
          },
          {
            title: "搜诶微",
            value: "https://api.souavzy.vip/api.php/provide/vod/",
          },
          {
            title: "LSP",
            value: "https://apilsbzy1.com/api.php/provide/vod",
          },
        ],
      },
      {
        name: "wd",
        title: "關鍵詞",
        type: "input",
        description: "搜尋的關鍵詞",
        value: "",
      },
      {
        name: "pg",
        title: "頁碼",
        type: "page",
        value: "1",
      },
    ],
  },
};

// API基礎URL
var apiBaseUrl = "";

// 初始化OpenCC轉換器
let converter;
try {
    converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
} catch (e) {
    console.error('OpenCC初始化失敗:', e);
}

/**
 * 文本清理函數
 */
function cleanText(text) {
    if (!text || typeof text !== 'string') return '';
    
    // 處理常見亂碼變體
    const decoded = text
        .replace(/&amp;?nbsp;?/gi, ' ')  // 處理 &nbsp; &amp;nbsp; &ampinbsp; 等變體
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s{2,}/g, ' ')          // 合併連續空格
        .trim();
    
    return decoded;
}

/**
 * 簡體轉繁體函數
 */
function convertToTraditional(text) {
    if (!converter) {
        console.warn('OpenCC不可用，跳過轉換');
        return text;
    }
    try {
        return converter(text);
    } catch (e) {
        console.error('轉換失敗:', e);
        return text;
    }
}

/**
 * 處理文本（清理+轉換）
 */
function processText(text) {
    return convertToTraditional(cleanText(text));
}

/**
 * 構建請求URL
 */
function buildRequestUrl(baseUrl, queryParams = {}) {
  let finalUrl = baseUrl;
  let firstParam = true;

  if (!finalUrl.endsWith("/") && !finalUrl.includes("?")) {
    const schemeIndex = finalUrl.indexOf("://");
    const pathPart =
      schemeIndex !== -1 ? finalUrl.substring(schemeIndex + 3) : finalUrl;
    if (
      !pathPart.includes(".") ||
      pathPart.substring(pathPart.lastIndexOf(".")).length > 5
    ) {
      finalUrl += "/";
    }
  }

  if (finalUrl.includes("?")) {
    firstParam = false;
  }

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      const value = queryParams[key];
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        if (firstParam) {
          finalUrl += "?";
          firstParam = false;
        } else {
          finalUrl += "&";
        }
        finalUrl += `${encodeURIComponent(key)}=${encodeURIComponent(
          String(value)
        )}`;
      }
    }
  }
  return finalUrl;
}

/**
 * 從 vod_play_url 中解析劇集和播放連結 (供 loadDetail 使用)
 * @param {string} vodPlayUrl
 * @param {string} mainTitle - 影片主標題，用於生成劇集標題
 * @returns {{bestVideoUrl: string|null, episodeItems: Array<object>}}
 */
function parsePlayUrlData(vodPlayUrl, mainTitle = "播放") {
  const episodeItems = [];
  let bestVideoUrl = null;

  if (!vodPlayUrl || typeof vodPlayUrl !== "string") {
    console.warn(
      `parsePlayUrlData: vod_play_url 無效。收到:`,
      vodPlayUrl
    );
    return { bestVideoUrl, episodeItems };
  }

  const playSources = vodPlayUrl.split("$$$");

  const m3u8Sources = playSources.filter((s) =>
    s.toLowerCase().includes(".m3u8")
  );
  const otherSources = playSources.filter(
    (s) => !s.toLowerCase().includes(".m3u8")
  );
  const sortedSources = [...m3u8Sources, ...otherSources];

  for (const sourceString of sortedSources) {
    if (!sourceString || typeof sourceString !== "string") continue;

    if (
      sourceString.toLowerCase().startsWith("http") &&
      !sourceString.includes("#") &&
      !sourceString.includes("$")
    ) {
      const directUrl = sourceString.trim();
      if (
        !bestVideoUrl ||
        (directUrl.toLowerCase().includes(".m3u8") &&
          (!bestVideoUrl || !bestVideoUrl.toLowerCase().includes(".m3u8")))
      ) {
        bestVideoUrl = directUrl;
      }
      episodeItems.push({
        id: (episodeItems.length + 1).toString(), // 自增ID
        type: "url",
        title: processText(mainTitle), // 處理主標題
        videoUrl: directUrl,
        mediaType: "tv",
      });
      if (
        bestVideoUrl &&
        bestVideoUrl.toLowerCase().includes(".m3u8") &&
        episodeItems.length > 0
      ) {
        break;
      }
      continue;
    }

    if (sourceString.includes("$")) {
      const episodes = sourceString.split("#");
      for (const episodeString of episodes) {
        if (!episodeString || typeof episodeString !== "string") continue;

        const parts = episodeString.split("$");
        let episodeName = "";
        let potentialUrl = "";

        if (parts.length >= 2) {
          // 清理並轉換劇集名稱
          episodeName = processText(parts[0].trim()) || processText(`第 ${episodeItems.length + 1} 集`);
          potentialUrl = parts[1].trim();
        } else if (
          parts.length === 1 &&
          parts[0].trim().toLowerCase().startsWith("http")
        ) {
          potentialUrl = parts[0].trim();
          episodeName = processText(`播放 ${episodeItems.length + 1}`);
        }

        if (potentialUrl && potentialUrl.toLowerCase().startsWith("http")) {
          if (
            !bestVideoUrl ||
            (potentialUrl.toLowerCase().includes(".m3u8") &&
              (!bestVideoUrl || !bestVideoUrl.toLowerCase().includes(".m3u8")))
          ) {
            bestVideoUrl = potentialUrl;
          }
          episodeItems.push({
            id: (episodeItems.length + 1).toString(),
            type: "url",
            title: episodeName,
            videoUrl: potentialUrl,
            mediaType: "episode",
          });
        }
      }
      if (
        episodeItems.length > 0 &&
        bestVideoUrl &&
        bestVideoUrl.toLowerCase().includes(".m3u8")
      ) {
        break;
      }
    }
  }
  return { bestVideoUrl, episodeItems };
}

/**
 * 解析接口影片數據
 * @param {object} apiVideoData - 從API獲取的單個影片對象
 * @returns {object} Forward VideoItem格式的對象
 */
function parseItemFromListApi(apiVideoData) {
  const numericalVodId = String(apiVideoData.vod_id);
  const detailPageApiUrl = buildRequestUrl(apiBaseUrl, {
    ac: "detail",
    ids: numericalVodId,
  });

  let mediaType = "movie";
  if (apiVideoData.type_name) {
    const typeName = String(apiVideoData.type_name).toLowerCase();
    if (
      typeName.includes("剧") ||
      typeName.includes("电视") ||
      typeName.includes("连续") ||
      typeName.includes("系列") ||
      typeName.includes("动漫")
    ) {
      mediaType = "tv";
    }
  }

  if (
    apiVideoData.vod_remarks &&
    String(apiVideoData.vod_remarks).match(/第(\d+|全)集/) &&
    mediaType === "movie"
  ) {
    mediaType = "tv";
  }

  return {
    id: detailPageApiUrl,
    type: "url",
    title: processText(apiVideoData.vod_name || "未知標題"),
    posterPath: apiVideoData.vod_pic,
    backdropPath: apiVideoData.vod_pic_slide || apiVideoData.vod_pic,
    releaseDate: apiVideoData.vod_time,
    mediaType: mediaType,
    genreTitle: processText(apiVideoData.type_name),
    description: processText(
      apiVideoData.vod_blurb ||
      apiVideoData.vod_remarks ||
      apiVideoData.vod_content
    ),
    link: detailPageApiUrl,
  };
}

/**
 * 獲取影片列表
 */
async function getVodList(params = {}) {
  const apiUrl = params.apiUrl;
  if (!apiUrl || String(apiUrl).trim() === "") {
    throw new Error("API源地址 (apiUrl) 不能為空");
  }
  apiBaseUrl = apiUrl.trim();

  const queryParams = {
    ac: "videolist",
    t: params.t,
    pg: params.pg,
    h: params.h,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);
  console.log(`getVodList: 請求VOD列表API: ${requestUrl}`);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data) {
      console.error(
        "getVodList: API請求失敗，未收到任何數據。URL:",
        requestUrl
      );
      throw new Error("API請求失敗: 未收到任何數據。");
    }
    if (data.code !== 1) {
      const errorMsg = data.msg || "未知API錯誤";
      console.error(
        "getVodList: API請求返回錯誤:",
        errorMsg,
        "響應代碼:",
        data.code
      );
      throw new Error(`API請求失敗: ${errorMsg} (code: ${data.code})`);
    }

    if (data.list && Array.isArray(data.list)) {
      const resultList = data.list.map((apiItem) =>
        parseItemFromListApi(apiItem)
      );
      console.log(`getVodList: 成功解析 ${resultList.length} 個影片項目。`);
      return resultList;
    } else {
      console.warn(
        "getVodList: API返回的影片列表 'list' 為空或格式不正確。",
        data
      );
      return [];
    }
  } catch (error) {
    console.error(
      `getVodList: 獲取影片列表時發生錯誤 (${requestUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`獲取影片列表失敗: ${error.message}.`);
  }
}

/**
 * 搜尋影片
 */
async function searchVod(params = {}) {
  const apiUrl = params.apiUrl;
  if (!apiUrl || String(apiUrl).trim() === "") {
    throw new Error("API源地址 (apiUrl) 不能為空");
  }
  apiBaseUrl = apiUrl.trim();

  const keyword = params.wd;

  const queryParams = {
    ac: "videolist",
    wd: keyword,
    pg: params.pg,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);
  console.log(`searchVod: 請求VOD搜尋API: ${requestUrl}`);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data) {
      console.error("searchVod: API搜尋失敗，未收到任何數據。URL:", requestUrl);
      throw new Error("API搜尋失敗: 未收到任何數據。");
    }
    if (data.code !== 1) {
      const errorMsg = data.msg || "未知API錯誤";
      console.error(
        "searchVod: API搜尋返回錯誤:",
        errorMsg,
        "響應代碼:",
        data.code
      );
      throw new Error(`API搜尋失敗: ${errorMsg} (code: ${data.code})`);
    }

    if (data.list && Array.isArray(data.list)) {
      const resultList = data.list.map((apiItem) =>
        parseItemFromListApi(apiItem)
      );
      console.log(`searchVod: 成功解析 ${resultList.length} 個搜尋結果。`);
      return resultList;
    } else {
      console.warn(
        "searchVod: API搜尋返回的影片列表 'list' 為空或格式不正確。",
        data
      );
      return [];
    }
  } catch (error) {
    console.error(
      `searchVod: 搜尋影片時發生錯誤 (${requestUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`搜尋影片失敗: ${error.message}.`);
  }
}

/**
 * 加載詳細資訊
 */
async function loadDetail(detailPageApiUrl) {
  if (!detailPageApiUrl || typeof detailPageApiUrl !== "string") {
    console.error(
      "loadDetail: 無效的 detailPageApiUrl 參數:",
      detailPageApiUrl
    );
    throw new Error("無效的參數：detailPageApiUrl 不能為空。");
  }

  let numericalVodId = "";
  try {
    const idsMatch = detailPageApiUrl.match(/[?&]ids=(\d+)/);
    if (idsMatch && idsMatch[1]) {
      numericalVodId = idsMatch[1];
    } else {
      console.error(
        "loadDetail: 無法從 detailPageApiUrl 中提取 'ids' 參數:",
        detailPageApiUrl
      );
      throw new Error("無法解析影片ID從詳情URL。");
    }
  } catch (e) {
    console.error(
      "loadDetail: 解析 detailPageApiUrl 時出錯:",
      detailPageApiUrl,
      e
    );
    throw new Error("詳情URL格式無效。");
  }

  console.log(`loadDetail: 請求VOD詳情API: ${detailPageApiUrl}`);

  try {
    const response = await Widget.http.get(detailPageApiUrl);
    const data = response.data;

    if (
      !data ||
      data.code !== 1 ||
      !Array.isArray(data.list) ||
      data.list.length === 0
    ) {
      const errorMsg = data ? data.msg || "未知API錯誤" : "未收到任何數據";
      console.error(
        "loadDetail: 詳情API請求失敗或返回數據無效:",
        errorMsg,
        "響應代碼:",
        data ? data.code : "N/A"
      );
      throw new Error(`詳情API請求失敗: ${errorMsg}`);
    }

    const videoInfo = data.list[0];
    const mainTitle = processText(videoInfo.vod_name || "播放");
    const parsedPlayData = parsePlayUrlData(
      videoInfo.vod_play_url,
      mainTitle
    );
    const parsedEpisodeCount = parsedPlayData.episodeItems.length;

    let returnObject = {
      id: detailPageApiUrl,
      type: "url",
      title: mainTitle,
      description: processText(
        videoInfo.vod_blurb ||
        videoInfo.vod_remarks ||
        videoInfo.vod_content ||
        ""
      ),
      posterPath: videoInfo.vod_pic,
      backdropPath: videoInfo.vod_pic_slide || videoInfo.vod_pic,
      releaseDate: videoInfo.vod_time,
      genreTitle: processText(videoInfo.type_name),
      videoUrl: parsedPlayData.bestVideoUrl,
      link: detailPageApiUrl,
    };

    // 解析集數
    if (parsedEpisodeCount > 1) {
      returnObject.mediaType = "tv";
      returnObject.episodeItems = parsedPlayData.episodeItems;

      let totalEpisodes = parsedEpisodeCount;
      if (videoInfo.vod_remarks) {
        const remarks = String(videoInfo.vod_remarks);
        const match = remarks.match(/(?:全|至|更新至|第)\s*(\d+)\s*集/);
        if (match && match[1]) {
          totalEpisodes = parseInt(match[1], 10);
        }
      }
      returnObject.episode = totalEpisodes;
    } else {
      // 單集或電影
      let finalMediaType = "movie";
      if (videoInfo.type_name) {
        const typeName = String(videoInfo.type_name).toLowerCase();
        if (
          typeName.includes("剧") ||
          typeName.includes("电视") ||
          typeName.includes("动漫") ||
          typeName.includes("连续") ||
          typeName.includes("系列")
        ) {
          finalMediaType = "tv";
        }
      }
      if (
        videoInfo.vod_remarks &&
        String(videoInfo.vod_remarks).includes("集")
      ) {
        finalMediaType = "tv";
      }
      returnObject.mediaType = finalMediaType;
    }

    console.log("loadDetail returning object:", returnObject);
    return returnObject;
  } catch (error) {
    console.error(
      `loadDetail: 加載影片詳情時發生錯誤 (ID: ${numericalVodId}, URL: ${detailPageApiUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`加載影片詳情失敗: ${error.message}.`);
  }
}