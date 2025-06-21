// ==UserScript==
// @name         VOD影片數據助手 (繁體中文優化版)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  獲取VOD影視數據並優化繁體中文顯示
// @author       Ti
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js
// @run-at       document-start
// ==/UserScript==

var WidgetMetadata = {
  id: "ti.bemarkt.vod.maccms",
  title: "VOD影視助手",
  description: "獲取VOD影視數據並優化繁體中文顯示",
  author: "Ethan",
  site: "https://github.com/bemarkt/scripts/tree/master/provider/Forward",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "獲取影片列表",
      description: "根據API地址、分類、頁碼等參數獲取影片列表",
      requiresWebView: false,
      functionName: "getVodList",
      params: [
        {
          name: "apiUrl",
          title: "影片源地址",
          type: "input",
          description: "請輸入蘋果CMS的JSON API地址 (範例: https://example.com/api.php/provide/vod/)",
          value: "https://api.wwzy.tv/api.php/provide/vod/",
          placeholders: [
            { title: "極速資源", value: "https://jszyapi.com/api.php/provide/vod/" },
            { title: "木耳資源", value: "https://json02.heimuer.xyz/api.php/provide/vod/" },
            { title: "蝦米資源", value: "https://gctf.tfdh.top/api.php/provide/vod/" },
            { title: "魔抓資源", value: "https://mozhuazy.com/api.php/provide/vod/" },
            { title: "無盡資源", value: "https://api.wujinapi.me/api.php/provide/vod/" },
            { title: "金鷹資源", value: "https://jyzyapi.com/provide/vod/from/jinyingm3u8/at/json" },
            { title: "旺旺短劇", value: "https://api.wwzy.tv/api.php/provide/vod/" },
            { title: "量子資源", value: "https://cj.lziapi.com/api.php/provide/vod/at/json/" },
            { title: "貓咪資源", value: "http://zy.xiaomaomi.cc/api.php/provide/vod/" },
            { title: "臥龍資源", value: "https://collect.wolongzy.cc/api.php/provide/vod/" },
            { title: "無憂資源", value: "https://www.wyvod.com/api.php/provide/vod/" },
            { title: "如意資源", value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/" },
            { title: "九零資源", value: "https://oknnews.com/api.php/provide/vod/" },
            { title: "含羞資源", value: "https://api.souavzy.vip/api.php/provide/vod/" },
            { title: "玉兔資源", value: "https://apiyutu.com/api.php/provide/vod/" },
            { title: "豆瓣資源", value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/" },
            { title: "阿里資源", value: "https://alivod.com/api.php/provide/vod/" },
            { title: "LSP資源", value: "https://apilsbzy1.com/api.php/provide/vod" },
            { title: "先鋒資源", value: "http://60.204.225.89:1122/api.php/provide/vod/" }
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
          title: "最近更新時間",
          type: "input",
          description: "僅顯示最近N小時內更新的影片 (範例: 24，可留空)",
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
        description: "請輸入蘋果CMS的JSON API地址 (範例: https://example.com/api.php/provide/vod/)",
        value: "https://api.wwzy.tv/api.php/provide/vod/",
        placeholders: [
          { title: "扶風資源", value: "http://60.204.225.89:1122/api.php/provide/vod/" },
          { title: "極速資源", value: "https://jszyapi.com/api.php/provide/vod/" },
          { title: "蝦米資源", value: "https://zy.hls.one/api.php/provide/vod/" },
          { title: "魔抓資源", value: "https://mozhuazy.com/api.php/provide/vod/" },
          { title: "旺旺短劇", value: "https://api.wwzy.tv/api.php/provide/vod/" },
          { title: "量子資源", value: "https://cj.lziapi.com/api.php/provide/vod/at/json/" },
          { title: "如意資源", value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/" },
          { title: "九零資源", value: "https://oknnews.com/api.php/provide/vod/" },
          { title: "貓咪資源", value: "http://zy.xiaomaomi.cc/api.php/provide/vod/" },
          { title: "豆瓣資源", value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/" },
          { title: "阿里資源", value: "https://alivod.com/api.php/provide/vod/" },
          { title: "臥龍資源", value: "https://collect.wolongzy.cc/api.php/provide/vod/" },
          { title: "玉兔資源", value: "https://apiyutu.com/api.php/provide/vod/" },
          { title: "LSP資源", value: "https://apilsbzy1.com/api.php/provide/vod" }
        ],
      },
      {
        name: "wd",
        title: "關鍵詞",
        type: "input",
        description: "請輸入搜尋關鍵詞",
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

// 簡繁轉換器實例
var openccConverter = null;

// 初始化OpenCC轉換器
function initOpenCCConverter() {
  try {
    if (typeof OpenCC !== 'undefined') {
      openccConverter = OpenCC.Converter({ from: 'cn', to: 'tw' });
      console.log('OpenCC轉換器初始化成功');
      return true;
    }
  } catch (e) {
    console.error('OpenCC初始化失敗:', e);
  }
  return false;
}

// 文本清理函數 - 專為繁體中文優化
function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  
  // 處理常見亂碼變體
  let cleaned = text
    .replace(/&amp;?nbsp;?/gi, ' ')  // 處理空格亂碼
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')          // 合併連續空格
    .replace(/[　]+/g, ' ')        // 處理全形空格
    .trim();
  
  // 移除常見無意義前綴
  cleaned = cleaned.replace(/^(簡介|剧情|劇情|片花|花絮)[:：\s]+/i, '');
  
  return cleaned;
}

// 簡體轉繁體函數
function convertToTraditional(text) {
  if (!openccConverter && !initOpenCCConverter()) {
    return text;
  }
  
  try {
    return openccConverter(text);
  } catch (e) {
    console.error('簡繁轉換失敗:', e);
    return text;
  }
}

// 處理文本（清理+轉換）
function processText(text) {
  return convertToTraditional(cleanText(text));
}

// 確保在腳本加載時初始化轉換器
(function init() {
  if (typeof OpenCC !== 'undefined') {
    initOpenCCConverter();
  } else {
    // 重試機制
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (initOpenCCConverter() || retryCount >= maxRetries) {
        clearInterval(retryInterval);
      }
    }, 300);
  }
})();

/**
 * 構建請求URL
 */
function buildRequestUrl(baseUrl, queryParams = {}) {
  let finalUrl = baseUrl;
  let firstParam = true;

  // 確保URL結尾有斜線
  if (!finalUrl.endsWith("/") && !finalUrl.includes("?")) {
    finalUrl += "/";
  }

  // 添加查詢參數
  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      const value = queryParams[key];
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        finalUrl += firstParam ? "?" : "&";
        finalUrl += `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        firstParam = false;
      }
    }
  }
  
  return finalUrl;
}

/**
 * 從 vod_play_url 解析劇集和播放連結
 */
function parsePlayUrlData(vodPlayUrl, mainTitle = "播放") {
  const episodeItems = [];
  let bestVideoUrl = null;

  if (!vodPlayUrl || typeof vodPlayUrl !== "string") {
    return { bestVideoUrl, episodeItems };
  }

  // 處理常見格式問題
  const normalizedUrl = vodPlayUrl
    .replace(/\$\$\$/g, '#')
    .replace(/#+/g, '#')
    .replace(/\$+/g, '$');

  // 分割不同來源
  const playSources = normalizedUrl.split('#');
  
  for (const sourceString of playSources) {
    if (!sourceString) continue;
    
    // 直接URL格式
    if (sourceString.startsWith("http")) {
      const urlMatch = sourceString.match(/https?:\/\/[^\s$]+/);
      if (urlMatch) {
        const videoUrl = urlMatch[0];
        if (!bestVideoUrl || (videoUrl.includes(".m3u8") && !bestVideoUrl.includes(".m3u8"))) {
          bestVideoUrl = videoUrl;
        }
        episodeItems.push({
          id: (episodeItems.length + 1).toString(),
          type: "url",
          title: processText(mainTitle),
          videoUrl: videoUrl,
          mediaType: "tv",
        });
      }
      continue;
    }

    // 標準格式: 名稱$URL
    if (sourceString.includes("$")) {
      const parts = sourceString.split('$');
      if (parts.length >= 2 && parts[1].startsWith("http")) {
        const episodeName = parts[0].trim() || `第${episodeItems.length + 1}集`;
        const videoUrl = parts[1].trim();
        
        if (!bestVideoUrl || (videoUrl.includes(".m3u8") && !bestVideoUrl.includes(".m3u8"))) {
          bestVideoUrl = videoUrl;
        }
        
        episodeItems.push({
          id: (episodeItems.length + 1).toString(),
          type: "url",
          title: processText(episodeName),
          videoUrl: videoUrl,
          mediaType: "episode",
        });
      }
    }
  }
  
  // 確保至少有一個播放連結
  if (episodeItems.length === 0 && bestVideoUrl) {
    episodeItems.push({
      id: "1",
      type: "url",
      title: processText(mainTitle),
      videoUrl: bestVideoUrl,
      mediaType: "tv",
    });
  }
  
  return { bestVideoUrl, episodeItems };
}

/**
 * 解析API影片數據
 */
function parseItemFromListApi(apiVideoData) {
  const numericalVodId = String(apiVideoData.vod_id);
  const detailPageApiUrl = buildRequestUrl(apiBaseUrl, {
    ac: "detail",
    ids: numericalVodId,
  });

  // 智能判斷媒體類型
  let mediaType = "movie";
  const typeName = apiVideoData.type_name ? String(apiVideoData.type_name).toLowerCase() : "";
  const remarks = apiVideoData.vod_remarks ? String(apiVideoData.vod_remarks) : "";
  
  if (typeName.includes("剧") || typeName.includes("电视") || typeName.includes("连续") || 
      typeName.includes("系列") || typeName.includes("动漫") || remarks.match(/第(\d+|全)集/)) {
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
    genreTitle: processText(apiVideoData.type_name || ""),
    description: processText(
      apiVideoData.vod_blurb || 
      apiVideoData.vod_remarks || 
      apiVideoData.vod_content || 
      "暫無簡介"
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
    throw new Error("請提供有效的API源地址");
  }
  
  apiBaseUrl = apiUrl.trim();
  if (!apiBaseUrl.endsWith('/')) {
    apiBaseUrl += '/';
  }

  const queryParams = {
    ac: "videolist",
    t: params.t,
    pg: params.pg,
    h: params.h,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data || data.code !== 1 || !Array.isArray(data.list)) {
      const errorMsg = data ? (data.msg || "未知API錯誤") : "未收到有效數據";
      throw new Error(`API請求失敗: ${errorMsg}`);
    }

    // 轉換並過濾無效項目
    const resultList = data.list
      .filter(item => item.vod_id && item.vod_name)
      .map(parseItemFromListApi);
    
    return resultList;
  } catch (error) {
    console.error(`獲取影片列表失敗 (${requestUrl}):`, error);
    throw new Error(`獲取影片列表失敗: ${error.message}`);
  }
}

/**
 * 搜尋影片
 */
async function searchVod(params = {}) {
  const apiUrl = params.apiUrl;
  if (!apiUrl || String(apiUrl).trim() === "") {
    throw new Error("請提供有效的API源地址");
  }
  
  apiBaseUrl = apiUrl.trim();
  if (!apiBaseUrl.endsWith('/')) {
    apiBaseUrl += '/';
  }

  const keyword = params.wd;
  if (!keyword || keyword.trim() === "") {
    throw new Error("請輸入搜尋關鍵詞");
  }

  const queryParams = {
    ac: "videolist",
    wd: keyword,
    pg: params.pg,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data || data.code !== 1 || !Array.isArray(data.list)) {
      const errorMsg = data ? (data.msg || "未知API錯誤") : "未收到有效數據";
      throw new Error(`搜尋失敗: ${errorMsg}`);
    }

    // 轉換並過濾無效項目
    const resultList = data.list
      .filter(item => item.vod_id && item.vod_name)
      .map(parseItemFromListApi);
    
    return resultList;
  } catch (error) {
    console.error(`影片搜尋失敗 (${requestUrl}):`, error);
    throw new Error(`影片搜尋失敗: ${error.message}`);
  }
}

/**
 * 加載影片詳情
 */
async function loadDetail(detailPageApiUrl) {
  if (!detailPageApiUrl || typeof detailPageApiUrl !== "string") {
    throw new Error("無效的影片詳情URL");
  }

  // 從URL提取影片ID
  const idMatch = detailPageApiUrl.match(/[?&]ids=(\d+)/);
  if (!idMatch || !idMatch[1]) {
    throw new Error("無法從URL解析影片ID");
  }
  const numericalVodId = idMatch[1];

  try {
    const response = await Widget.http.get(detailPageApiUrl);
    const data = response.data;

    if (!data || data.code !== 1 || !Array.isArray(data.list) || data.list.length === 0) {
      const errorMsg = data ? (data.msg || "未知錯誤") : "未收到有效數據";
      throw new Error(`詳情請求失敗: ${errorMsg}`);
    }

    const videoInfo = data.list[0];
    
    // 處理所有文本內容
    const processedTitle = processText(videoInfo.vod_name || "未知標題");
    const processedDescription = processText(
      videoInfo.vod_blurb || 
      videoInfo.vod_remarks || 
      videoInfo.vod_content || 
      "暫無簡介"
    );
    const processedGenre = processText(videoInfo.type_name || "");

    // 解析播放連結
    const parsedPlayData = parsePlayUrlData(videoInfo.vod_play_url, processedTitle);
    
    // 構建返回對象
    const result = {
      id: detailPageApiUrl,
      type: "url",
      title: processedTitle,
      description: processedDescription,
      posterPath: videoInfo.vod_pic,
      backdropPath: videoInfo.vod_pic_slide || videoInfo.vod_pic,
      releaseDate: videoInfo.vod_time,
      genreTitle: processedGenre,
      videoUrl: parsedPlayData.bestVideoUrl,
      link: detailPageApiUrl,
      mediaType: "movie",
    };

    // 處理劇集信息
    if (parsedPlayData.episodeItems.length > 1) {
      result.mediaType = "tv";
      result.episodeItems = parsedPlayData.episodeItems;
      
      // 自動檢測總集數
      if (videoInfo.vod_remarks) {
        const remarks = String(videoInfo.vod_remarks);
        const match = remarks.match(/(?:全|至|更新至|第)\s*(\d+)\s*集/);
        if (match && match[1]) {
          result.episode = parseInt(match[1], 10);
        }
      }
    } else if (
      videoInfo.type_name && 
      String(videoInfo.type_name).toLowerCase().includes("剧")
    ) {
      result.mediaType = "tv";
    }

    return result;
  } catch (error) {
    console.error(`加載影片詳情失敗 (ID: ${numericalVodId}):`, error);
    throw new Error(`加載影片詳情失敗: ${error.message}`);
  }
}