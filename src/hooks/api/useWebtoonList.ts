import { Contents, WebtoonItemResponseDTO, Platform } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { useQuery } from 'react-query';

function useWebtoonList() {
  const getPlatformQuery = (platform: Platform) => {
    return useQuery<Contents<WebtoonItemResponseDTO>>(
      [`${platform}-webtoon-list`],
      () => getWebtoonsAPI(platform),
    );
  };

  return {
    naverWebtoonsQuery: getPlatformQuery('NAVER'),
    kakaoWebtoonsQuery: getPlatformQuery('KAKAO'),
  };
}

export default useWebtoonList;
