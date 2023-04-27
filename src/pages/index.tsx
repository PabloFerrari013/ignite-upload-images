import { Button, Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

import { Header } from "../components/Header";
import { CardList } from "../components/CardList";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

interface useInfiniteQueryResponse {
  data: {
    pages: {
      data: {
        title: string;
        description: string;
        url: string;
        ts: string;
        id: string;
      };
      after: string;
    }[];
  };
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<useInfiniteQueryResponse>(
    "images",
    ({ pageParam = null }) => api.get(`/api/images?after=${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage);

        if (!lastPage?.data?.pages[0].after) return null;
        return lastPage.data.pages[0].after;
      },
    }
  );

  const formattedData = useMemo(() => {
    console.log(data);

    // TODO FORMAT AND FLAT DATA ARRAY
    console.log(data);
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <h1>Hello World</h1>
      {/* <Header /> */}

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE*/}
      </Box>
    </>
  );
}
