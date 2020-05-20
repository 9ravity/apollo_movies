import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

//query getMovie($id:Int) 이건 apollo를 위함, apollo가 확인, movie(id:$id)는 서버로 전달
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 9px;
`;

export default () => {
  let { id } = useParams();
  id = parseInt(id); // parameter 를 잡는다.
  //console.log(id);
  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: {
      id,
    },
  });
  console.log(loading, data, error);
  /*  title
      medium_cover_image
      language
      rating
      description_intro */

  return (
    <Container>
      <Column>
        {/*   <Title>{loading ? "loading . . ." : data.movie.title}</Title> */}
        {/* loading 텍스트를 보여주고 싶지 않을 때, */}

        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro} </Description>
      </Column>
      {!loading && data.movie && data.suggestions && (
        <>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>
          <Movies>
            {data?.suggestions?.map((s) => (
              <Movie key={s.id} id={s.id} bg={s.medium_cover_image}></Movie>
            ))}
          </Movies>
        </>
      )}
    </Container>
  );
};
