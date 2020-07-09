import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getPosts?: Maybe<Array<Maybe<GetPostsResult>>>;
  getArtist?: Maybe<Artist>;
  search?: Maybe<SearchResult>;
  getCurrentUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryGetArtistArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  type?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
};

export type GetPostsResult = AlbumPost | ArtistPost | TrackPost;

export type AlbumPost = {
  __typename?: 'AlbumPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  imageUrl?: Maybe<Scalars['String']>;
  albumId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  albumName?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type ArtistPost = {
  __typename?: 'ArtistPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  imageUrl?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
};

export type TrackPost = {
  __typename?: 'TrackPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  imageUrl?: Maybe<Scalars['String']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  trackName?: Maybe<Scalars['String']>;
};

export type Artist = {
  __typename?: 'Artist';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<Array<Maybe<ExternalUrl>>>;
};

export type Image = {
  __typename?: 'Image';
  url?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']>;
};

export type SearchResult = TrackSearchResult | ArtistSearchResult | AlbumSearchResult;

export type TrackSearchResult = {
  __typename?: 'TrackSearchResult';
  tracks?: Maybe<TrackItems>;
};

export type TrackItems = {
  __typename?: 'TrackItems';
  items?: Maybe<Array<Maybe<Track>>>;
};

export type Track = {
  __typename?: 'Track';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<Array<Maybe<ExternalUrl>>>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
};

export type Album = {
  __typename?: 'Album';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<Array<Maybe<ExternalUrl>>>;
  release_date?: Maybe<Scalars['String']>;
  album_type?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
};

export type ArtistSearchResult = {
  __typename?: 'ArtistSearchResult';
  artists?: Maybe<ArtistItems>;
};

export type ArtistItems = {
  __typename?: 'ArtistItems';
  items?: Maybe<Array<Maybe<Artist>>>;
};

export type AlbumSearchResult = {
  __typename?: 'AlbumSearchResult';
  albums?: Maybe<AlbumItems>;
};

export type AlbumItems = {
  __typename?: 'AlbumItems';
  items?: Maybe<Array<Maybe<Album>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  createPost?: Maybe<Scalars['Boolean']>;
  createArtistPost?: Maybe<ArtistPost>;
  createAlbumPost?: Maybe<AlbumPost>;
  createTrackPost?: Maybe<TrackPost>;
  register?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  link?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type MutationCreateArtistPostArgs = {
  data?: Maybe<ArtistPostInput>;
};


export type MutationCreateAlbumPostArgs = {
  data?: Maybe<AlbumPostInput>;
};


export type MutationCreateTrackPostArgs = {
  data?: Maybe<TrackPostInput>;
};


export type MutationRegisterArgs = {
  data?: Maybe<RegisterInput>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ArtistPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
};

export type AlbumPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  albumId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  albumName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TrackPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  trackName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RegisterInput = {
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  link: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'text' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'text' | 'imageUrl' | 'timeSubmitted' | 'artistId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'text' | 'artistNames' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type SearchSpotifyQueryVariables = Exact<{
  type: Scalars['String'];
  query: Scalars['String'];
}>;


export type SearchSpotifyQuery = (
  { __typename?: 'Query' }
  & { search?: Maybe<(
    { __typename?: 'TrackSearchResult' }
    & { tracks?: Maybe<(
      { __typename?: 'TrackItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Track' }
        & Pick<Track, 'id' | 'name' | 'type'>
        & { album?: Maybe<(
          { __typename?: 'Album' }
          & Pick<Album, 'name'>
          & { images?: Maybe<Array<Maybe<(
            { __typename?: 'Image' }
            & Pick<Image, 'url'>
          )>>> }
        )>, artists?: Maybe<Array<Maybe<(
          { __typename?: 'Artist' }
          & Pick<Artist, 'name'>
        )>>> }
      )>>> }
    )> }
  ) | (
    { __typename?: 'ArtistSearchResult' }
    & { artists?: Maybe<(
      { __typename?: 'ArtistItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'id' | 'type' | 'name'>
        & { images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>> }
      )>>> }
    )> }
  ) | (
    { __typename?: 'AlbumSearchResult' }
    & { albums?: Maybe<(
      { __typename?: 'AlbumItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Album' }
        & Pick<Album, 'id' | 'name' | 'type' | 'release_date'>
        & { artists?: Maybe<Array<Maybe<(
          { __typename?: 'Artist' }
          & Pick<Artist, 'name'>
        )>>>, images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>> }
      )>>> }
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);


export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $link: String!) {
  createPost(text: $text, link: $link)
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      link: // value for 'link'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    ... on AlbumPost {
      text
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      user {
        username
      }
    }
    ... on TrackPost {
      text
      artistNames
      vote
      imageUrl
      timeSubmitted
      trackId
      user {
        username
      }
    }
    ... on ArtistPost {
      text
      imageUrl
      timeSubmitted
      artistId
      user {
        username
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const SearchSpotifyDocument = gql`
    query searchSpotify($type: String!, $query: String!) {
  search(type: $type, query: $query) {
    ... on AlbumSearchResult {
      albums {
        items {
          id
          name
          type
          release_date
          artists {
            name
          }
          images {
            url
          }
        }
      }
    }
    ... on ArtistSearchResult {
      artists {
        items {
          id
          type
          name
          images {
            url
          }
        }
      }
    }
    ... on TrackSearchResult {
      tracks {
        items {
          id
          name
          type
          album {
            name
            images {
              url
            }
          }
          artists {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSearchSpotifyQuery__
 *
 * To run a query within a React component, call `useSearchSpotifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSpotifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSpotifyQuery({
 *   variables: {
 *      type: // value for 'type'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchSpotifyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchSpotifyQuery, SearchSpotifyQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchSpotifyQuery, SearchSpotifyQueryVariables>(SearchSpotifyDocument, baseOptions);
      }
export function useSearchSpotifyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchSpotifyQuery, SearchSpotifyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchSpotifyQuery, SearchSpotifyQueryVariables>(SearchSpotifyDocument, baseOptions);
        }
export type SearchSpotifyQueryHookResult = ReturnType<typeof useSearchSpotifyQuery>;
export type SearchSpotifyLazyQueryHookResult = ReturnType<typeof useSearchSpotifyLazyQuery>;
export type SearchSpotifyQueryResult = ApolloReactCommon.QueryResult<SearchSpotifyQuery, SearchSpotifyQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;