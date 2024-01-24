export const env = {
    queryApiUrl: 'http://localhost:3500',
}

export const db = {
    apiKey: 'api_key=70d4fecc6bb44c331e68ff7d257fa365',
    imageUrl: 'https://image.tmdb.org/t/p/original/',
    shortImageUrl: 'https://image.tmdb.org/t/p/w500/',
    youtube: 'www.youtube.com/watch?v=',
    vimeo: 'https://vimeo.com/',
    
    multiSearch: 'https://api.themoviedb.org/3/search/multi?',

    movieParamId: '{movie_id}',
    tvParamId: '{series_id}',
    personParamId: '{person_id}',
    
    movie: {
        trending: 'https://api.themoviedb.org/3/trending/movie/week?',
        nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?',
        popular: 'https://api.themoviedb.org/3/movie/popular?',
        topRated: 'https://api.themoviedb.org/3/movie/top_rated?',
        upComing: 'https://api.themoviedb.org/3/movie/upcoming?',

        search: 'https://api.themoviedb.org/3/search/movie?',
        details: 'https://api.themoviedb.org/3/movie/{movie_id}?',
        credits: 'https://api.themoviedb.org/3/movie/{movie_id}/credits?',
        images: 'https://api.themoviedb.org/3/movie/{movie_id}/images?',
        videos: 'https://api.themoviedb.org/3/movie/{movie_id}/videos?',
        similar: 'https://api.themoviedb.org/3/movie/{movie_id}/similar?',
        watchProviders: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?',
    },

    person: {
        trending: 'https://api.themoviedb.org/3/trending/person/week?',
        popular: 'https://api.themoviedb.org/3/person/popular?',

        search: 'https://api.themoviedb.org/3/search/person?',
        details: 'https://api.themoviedb.org/3/person/{person_id}?',
        images: 'https://api.themoviedb.org/3/person/{person_id}/images?',
        credits: 'https://api.themoviedb.org/3/person/{person_id}/combined_credits?',
        movieCredits: 'https://api.themoviedb.org/3/person/{person_id}/movie_credits?',
        tvCredits: 'https://api.themoviedb.org/3/person/{person_id}/tv_credits?',
    },
    
    tv: {
        trending: 'https://api.themoviedb.org/3/trending/tv/week?',
        topRated: 'https://api.themoviedb.org/3/tv/top_rated?',
        popular: 'https://api.themoviedb.org/3/tv/popular?',
        
        search: 'https://api.themoviedb.org/3/search/tv?',
        details: 'https://api.themoviedb.org/3/tv/{series_id}?',
        similar: 'https://api.themoviedb.org/3/tv/{series_id}/similar?',
        videos: 'https://api.themoviedb.org/3/tv/{series_id}/videos?',
        images: 'https://api.themoviedb.org/3/tv/{series_id}/images?',
        credits: 'https://api.themoviedb.org/3/tv/{series_id}/credits?',
        season: 'https://api.themoviedb.org/3/tv/{series_id}/season/{season_no}?',
        onAir: 'https://api.themoviedb.org/3/tv/on_the_air?',
        externalIds: 'https://api.themoviedb.org/3/tv/{series_id}/external_ids?',
        watchProviders: 'https://api.themoviedb.org/3/tv/{series_id}/watch/providers?'
    },

    movieGenreList: 'https://api.themoviedb.org/3/genre/movie/list?',
    tvGenreList: 'https://api.themoviedb.org/3/genre/tv/list?',

    omdbUrl: 'https://www.omdbapi.com/?apikey=df39e1ba&i=',
}