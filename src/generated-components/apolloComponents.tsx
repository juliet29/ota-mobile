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
  getArtistPosts?: Maybe<Array<Maybe<ArtistPost>>>;
  getAlbumPosts?: Maybe<Array<Maybe<AlbumPost>>>;
  getTrackPosts?: Maybe<Array<Maybe<TrackPost>>>;
  getAlbumTracks?: Maybe<AlbumTracks>;
  getArtistAlbums?: Maybe<ArtistAlbums>;
  getArtistTopTracks?: Maybe<ArtistTopTracks>;
  search?: Maybe<SearchResult>;
  getCurrentUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryGetArtistPostsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetAlbumPostsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetTrackPostsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetAlbumTracksArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetArtistAlbumsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetArtistTopTracksArgs = {
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
  externalUrl?: Maybe<Scalars['String']>;
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
  facebookId?: Maybe<Scalars['String']>;
};

export type ArtistPost = {
  __typename?: 'ArtistPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
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
  externalUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  imageUrl?: Maybe<Scalars['String']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  trackName?: Maybe<Scalars['String']>;
};

export type AlbumTracks = {
  __typename?: 'AlbumTracks';
  items?: Maybe<Array<Maybe<AlbumTrackItem>>>;
};

export type AlbumTrackItem = {
  __typename?: 'AlbumTrackItem';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
  preview_url?: Maybe<Scalars['String']>;
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

export type Album = {
  __typename?: 'Album';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  release_date?: Maybe<Scalars['String']>;
  album_type?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
};

export type Artist = {
  __typename?: 'Artist';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
};

export type ArtistAlbums = {
  __typename?: 'ArtistAlbums';
  items?: Maybe<Array<Maybe<Album>>>;
};

export type ArtistTopTracks = {
  __typename?: 'ArtistTopTracks';
  tracks?: Maybe<Array<Maybe<ArtistTopTrackItem>>>;
};

export type ArtistTopTrackItem = {
  __typename?: 'ArtistTopTrackItem';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
  is_playable?: Maybe<Scalars['Boolean']>;
  preview_url?: Maybe<Scalars['String']>;
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
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
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
  createAlbumPost?: Maybe<AlbumPost>;
  createArtistPost?: Maybe<ArtistPost>;
  createTrackPost?: Maybe<TrackPost>;
  createPost?: Maybe<Scalars['Boolean']>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Scalars['Boolean']>;
  facebookRegisterAndLogIn?: Maybe<LoginResponse>;
};


export type MutationCreateAlbumPostArgs = {
  data?: Maybe<AlbumPostInput>;
};


export type MutationCreateArtistPostArgs = {
  data?: Maybe<ArtistPostInput>;
};


export type MutationCreateTrackPostArgs = {
  data?: Maybe<TrackPostInput>;
};


export type MutationCreatePostArgs = {
  link?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  data?: Maybe<RegisterInput>;
};


export type MutationFacebookRegisterAndLogInArgs = {
  data?: Maybe<FacebookRegisterInput>;
};

export type AlbumPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  albumId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  albumName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ArtistPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
};

export type TrackPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  trackName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisterInput = {
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type FacebookRegisterInput = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CreateAlbumPostMutationVariables = Exact<{
  data: AlbumPostInput;
}>;


export type CreateAlbumPostMutation = (
  { __typename?: 'Mutation' }
  & { createAlbumPost?: Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id'>
  )> }
);

export type CreateArtistPostMutationVariables = Exact<{
  data: ArtistPostInput;
}>;


export type CreateArtistPostMutation = (
  { __typename?: 'Mutation' }
  & { createArtistPost?: Maybe<(
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id'>
  )> }
);

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  link: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type CreateTrackPostMutationVariables = Exact<{
  data: TrackPostInput;
}>;


export type CreateTrackPostMutation = (
  { __typename?: 'Mutation' }
  & { createTrackPost?: Maybe<(
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id'>
  )> }
);

export type GetAlbumPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAlbumPostsQuery = (
  { __typename?: 'Query' }
  & { getAlbumPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'albumName' | 'externalUrl' | 'artistNames' | 'text' | 'rating' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type GetArtistPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArtistPostsQuery = (
  { __typename?: 'Query' }
  & { getArtistPosts?: Maybe<Array<Maybe<(
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'artistName' | 'externalUrl' | 'text' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'text' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'text' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'text' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type GetTrackPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTrackPostsQuery = (
  { __typename?: 'Query' }
  & { getTrackPosts?: Maybe<Array<Maybe<(
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'trackName' | 'externalUrl' | 'text' | 'vote' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type GetAlbumTracksQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetAlbumTracksQuery = (
  { __typename?: 'Query' }
  & { getAlbumTracks?: Maybe<(
    { __typename?: 'AlbumTracks' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AlbumTrackItem' }
      & Pick<AlbumTrackItem, 'name' | 'preview_url' | 'track_number'>
      & { artists?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'name'>
      )>>> }
    )>>> }
  )> }
);

export type GetArtistAlbumsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArtistAlbumsQuery = (
  { __typename?: 'Query' }
  & { getArtistAlbums?: Maybe<(
    { __typename?: 'ArtistAlbums' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'id' | 'name' | 'type'>
      & { images?: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )>>> }
    )>>> }
  )> }
);

export type GetArtistTopTracksQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArtistTopTracksQuery = (
  { __typename?: 'Query' }
  & { getArtistTopTracks?: Maybe<(
    { __typename?: 'ArtistTopTracks' }
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'ArtistTopTrackItem' }
      & Pick<ArtistTopTrackItem, 'id' | 'name' | 'preview_url'>
      & { artists?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'name'>
      )>>>, album?: Maybe<(
        { __typename?: 'Album' }
        & { images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>> }
      )> }
    )>>> }
  )> }
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
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
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
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
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
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
      )>>> }
    )> }
  )> }
);

export type FacebookSsoMutationVariables = Exact<{
  data: FacebookRegisterInput;
}>;


export type FacebookSsoMutation = (
  { __typename?: 'Mutation' }
  & { facebookRegisterAndLogIn?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id' | 'email' | 'facebookId'>
  )> }
);


export const CreateAlbumPostDocument = gql`
    mutation CreateAlbumPost($data: AlbumPostInput!) {
  createAlbumPost(data: $data) {
    id
  }
}
    `;
export type CreateAlbumPostMutationFn = ApolloReactCommon.MutationFunction<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>;

/**
 * __useCreateAlbumPostMutation__
 *
 * To run a mutation, you first call `useCreateAlbumPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumPostMutation, { data, loading, error }] = useCreateAlbumPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAlbumPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>(CreateAlbumPostDocument, baseOptions);
      }
export type CreateAlbumPostMutationHookResult = ReturnType<typeof useCreateAlbumPostMutation>;
export type CreateAlbumPostMutationResult = ApolloReactCommon.MutationResult<CreateAlbumPostMutation>;
export type CreateAlbumPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>;
export const CreateArtistPostDocument = gql`
    mutation CreateArtistPost($data: ArtistPostInput!) {
  createArtistPost(data: $data) {
    id
  }
}
    `;
export type CreateArtistPostMutationFn = ApolloReactCommon.MutationFunction<CreateArtistPostMutation, CreateArtistPostMutationVariables>;

/**
 * __useCreateArtistPostMutation__
 *
 * To run a mutation, you first call `useCreateArtistPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArtistPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArtistPostMutation, { data, loading, error }] = useCreateArtistPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateArtistPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateArtistPostMutation, CreateArtistPostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateArtistPostMutation, CreateArtistPostMutationVariables>(CreateArtistPostDocument, baseOptions);
      }
export type CreateArtistPostMutationHookResult = ReturnType<typeof useCreateArtistPostMutation>;
export type CreateArtistPostMutationResult = ApolloReactCommon.MutationResult<CreateArtistPostMutation>;
export type CreateArtistPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateArtistPostMutation, CreateArtistPostMutationVariables>;
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
export const CreateTrackPostDocument = gql`
    mutation CreateTrackPost($data: TrackPostInput!) {
  createTrackPost(data: $data) {
    id
  }
}
    `;
export type CreateTrackPostMutationFn = ApolloReactCommon.MutationFunction<CreateTrackPostMutation, CreateTrackPostMutationVariables>;

/**
 * __useCreateTrackPostMutation__
 *
 * To run a mutation, you first call `useCreateTrackPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackPostMutation, { data, loading, error }] = useCreateTrackPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTrackPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTrackPostMutation, CreateTrackPostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTrackPostMutation, CreateTrackPostMutationVariables>(CreateTrackPostDocument, baseOptions);
      }
export type CreateTrackPostMutationHookResult = ReturnType<typeof useCreateTrackPostMutation>;
export type CreateTrackPostMutationResult = ApolloReactCommon.MutationResult<CreateTrackPostMutation>;
export type CreateTrackPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTrackPostMutation, CreateTrackPostMutationVariables>;
export const GetAlbumPostsDocument = gql`
    query getAlbumPosts($id: String!) {
  getAlbumPosts(id: $id) {
    albumName
    externalUrl
    artistNames
    text
    rating
    timeSubmitted
    user {
      username
    }
  }
}
    `;

/**
 * __useGetAlbumPostsQuery__
 *
 * To run a query within a React component, call `useGetAlbumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>(GetAlbumPostsDocument, baseOptions);
      }
export function useGetAlbumPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>(GetAlbumPostsDocument, baseOptions);
        }
export type GetAlbumPostsQueryHookResult = ReturnType<typeof useGetAlbumPostsQuery>;
export type GetAlbumPostsLazyQueryHookResult = ReturnType<typeof useGetAlbumPostsLazyQuery>;
export type GetAlbumPostsQueryResult = ApolloReactCommon.QueryResult<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>;
export const GetArtistPostsDocument = gql`
    query getArtistPosts($id: String!) {
  getArtistPosts(id: $id) {
    artistName
    externalUrl
    text
    timeSubmitted
    user {
      username
    }
  }
}
    `;

/**
 * __useGetArtistPostsQuery__
 *
 * To run a query within a React component, call `useGetArtistPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistPostsQuery, GetArtistPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArtistPostsQuery, GetArtistPostsQueryVariables>(GetArtistPostsDocument, baseOptions);
      }
export function useGetArtistPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistPostsQuery, GetArtistPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArtistPostsQuery, GetArtistPostsQueryVariables>(GetArtistPostsDocument, baseOptions);
        }
export type GetArtistPostsQueryHookResult = ReturnType<typeof useGetArtistPostsQuery>;
export type GetArtistPostsLazyQueryHookResult = ReturnType<typeof useGetArtistPostsLazyQuery>;
export type GetArtistPostsQueryResult = ApolloReactCommon.QueryResult<GetArtistPostsQuery, GetArtistPostsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    ... on AlbumPost {
      text
      externalUrl
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
      }
    }
    ... on TrackPost {
      text
      artistNames
      externalUrl
      vote
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
      }
    }
    ... on ArtistPost {
      text
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      artistName
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
export const GetTrackPostsDocument = gql`
    query getTrackPosts($id: String!) {
  getTrackPosts(id: $id) {
    trackName
    externalUrl
    text
    vote
    timeSubmitted
    user {
      username
    }
  }
}
    `;

/**
 * __useGetTrackPostsQuery__
 *
 * To run a query within a React component, call `useGetTrackPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTrackPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrackPostsQuery, GetTrackPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTrackPostsQuery, GetTrackPostsQueryVariables>(GetTrackPostsDocument, baseOptions);
      }
export function useGetTrackPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrackPostsQuery, GetTrackPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTrackPostsQuery, GetTrackPostsQueryVariables>(GetTrackPostsDocument, baseOptions);
        }
export type GetTrackPostsQueryHookResult = ReturnType<typeof useGetTrackPostsQuery>;
export type GetTrackPostsLazyQueryHookResult = ReturnType<typeof useGetTrackPostsLazyQuery>;
export type GetTrackPostsQueryResult = ApolloReactCommon.QueryResult<GetTrackPostsQuery, GetTrackPostsQueryVariables>;
export const GetAlbumTracksDocument = gql`
    query getAlbumTracks($id: String) {
  getAlbumTracks(id: $id) {
    items {
      name
      preview_url
      track_number
      artists {
        name
      }
    }
  }
}
    `;

/**
 * __useGetAlbumTracksQuery__
 *
 * To run a query within a React component, call `useGetAlbumTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumTracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumTracksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>(GetAlbumTracksDocument, baseOptions);
      }
export function useGetAlbumTracksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>(GetAlbumTracksDocument, baseOptions);
        }
export type GetAlbumTracksQueryHookResult = ReturnType<typeof useGetAlbumTracksQuery>;
export type GetAlbumTracksLazyQueryHookResult = ReturnType<typeof useGetAlbumTracksLazyQuery>;
export type GetAlbumTracksQueryResult = ApolloReactCommon.QueryResult<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>;
export const GetArtistAlbumsDocument = gql`
    query getArtistAlbums($id: String!) {
  getArtistAlbums(id: $id) {
    items {
      id
      name
      type
      images {
        url
      }
    }
  }
}
    `;

/**
 * __useGetArtistAlbumsQuery__
 *
 * To run a query within a React component, call `useGetArtistAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistAlbumsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistAlbumsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>(GetArtistAlbumsDocument, baseOptions);
      }
export function useGetArtistAlbumsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>(GetArtistAlbumsDocument, baseOptions);
        }
export type GetArtistAlbumsQueryHookResult = ReturnType<typeof useGetArtistAlbumsQuery>;
export type GetArtistAlbumsLazyQueryHookResult = ReturnType<typeof useGetArtistAlbumsLazyQuery>;
export type GetArtistAlbumsQueryResult = ApolloReactCommon.QueryResult<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>;
export const GetArtistTopTracksDocument = gql`
    query getArtistTopTracks($id: String!) {
  getArtistTopTracks(id: $id) {
    tracks {
      id
      name
      artists {
        name
      }
      preview_url
      album {
        images {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetArtistTopTracksQuery__
 *
 * To run a query within a React component, call `useGetArtistTopTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistTopTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistTopTracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistTopTracksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>(GetArtistTopTracksDocument, baseOptions);
      }
export function useGetArtistTopTracksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>(GetArtistTopTracksDocument, baseOptions);
        }
export type GetArtistTopTracksQueryHookResult = ReturnType<typeof useGetArtistTopTracksQuery>;
export type GetArtistTopTracksLazyQueryHookResult = ReturnType<typeof useGetArtistTopTracksLazyQuery>;
export type GetArtistTopTracksQueryResult = ApolloReactCommon.QueryResult<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>;
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
          external_urls {
            spotify
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
          external_urls {
            spotify
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
          external_urls {
            spotify
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
export const FacebookSsoDocument = gql`
    mutation facebookSSO($data: FacebookRegisterInput!) {
  facebookRegisterAndLogIn(data: $data) {
    accessToken
  }
}
    `;
export type FacebookSsoMutationFn = ApolloReactCommon.MutationFunction<FacebookSsoMutation, FacebookSsoMutationVariables>;

/**
 * __useFacebookSsoMutation__
 *
 * To run a mutation, you first call `useFacebookSsoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebookSsoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookSsoMutation, { data, loading, error }] = useFacebookSsoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFacebookSsoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FacebookSsoMutation, FacebookSsoMutationVariables>) {
        return ApolloReactHooks.useMutation<FacebookSsoMutation, FacebookSsoMutationVariables>(FacebookSsoDocument, baseOptions);
      }
export type FacebookSsoMutationHookResult = ReturnType<typeof useFacebookSsoMutation>;
export type FacebookSsoMutationResult = ApolloReactCommon.MutationResult<FacebookSsoMutation>;
export type FacebookSsoMutationOptions = ApolloReactCommon.BaseMutationOptions<FacebookSsoMutation, FacebookSsoMutationVariables>;
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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    username
    id
    email
    facebookId
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;