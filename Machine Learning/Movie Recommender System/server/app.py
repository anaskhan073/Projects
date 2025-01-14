import streamlit as st
import pickle
import pandas as pd
import requests

movies_dict = pickle.load(open('movies_dict.pkl','rb'))
similarity = pickle.load(open('similarity.pkl','rb'))
movies  = pd.DataFrame(movies_dict)

st.title('Movie Recommender System')


def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=8441763f95cf2aceca99a760e4c0da69&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    # poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + data['poster_path']
    return full_path


def recommend(movie):
        index = movies[movies['title'] == movie].index[0]
        distances = similarity[index]
        movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

        recommended_movie_names = []
        recommended_movie_posters = []
        for i in movie_list:
            movie_id = movies.iloc[i[0]].movie_id
            # fetch poster from API
            recommended_movie_names.append(movies.iloc[i[0]].title)
            recommended_movie_posters.append(fetch_poster(movie_id))
        return recommended_movie_names,recommended_movie_posters



movie_list = movies['title'].values
selected_movie = st.selectbox(
    "Type or select a movie from the dropdown",
    movie_list
)

if st.button('Show Recommendation'):
    recommended_movie_names,recommended_movie_posters = recommend(selected_movie)
    # Replace beta_columns with columns

    col1, col2, col3, col4, col5 = st.columns(5)
    with col1:
        st.text(recommended_movie_names[0])
        st.image(recommended_movie_posters[0])
    with col2:
        st.text(recommended_movie_names[1])
        st.image(recommended_movie_posters[1])

    with col3:
        st.text(recommended_movie_names[2])
        st.image(recommended_movie_posters[2])
    with col4:
        st.text(recommended_movie_names[3])
        st.image(recommended_movie_posters[3])
    with col5:
        st.text(recommended_movie_names[4])
        st.image(recommended_movie_posters[4])


