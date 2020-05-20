import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// apollo가 동작하는것은 mutation안에 likeMovie를 실행시킨다.
const TOGGLE_LIKE_MOVIE = gql`
  mutation toggleLikeMovieMutaion($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 9px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

// props로 id 받기
export default ({ id, bg, title, isLiked }) => {
  const [toggleMovieLike] = useMutation(TOGGLE_LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg}>{title}</Poster>
      </Link>
      <button onClick={toggleMovieLike}>{isLiked ? "Unlike" : "like"}</button>
    </Container>
  );
};
