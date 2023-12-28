import http from '../../../commons/http-istance.common'

const PREFIX = 'https://optimabalita.dev/api/article'

export interface IArticles {
  title: string
  description: string
  content: string
  image: File
}

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};


export interface IDeleteArticle {
  id: string
}

export const getArticlesApi = () => http.get(PREFIX)

export const postArticlesApi = (data: IArticles) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('content', data.content);
  if (data.image) {
    formData.append('image', data.image);
  }

  // Pass the FormData as the second parameter
  return http.post(PREFIX, formData, config).catch(function (error) {
    if (error) {
      return error;
    }
  });
};

export const deleteArticleApi = (id: string) => http.delete(`${PREFIX}/${id}`)

export const editArticleApi = (id: string, data: any) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('content', data.content);
  // check if data.image is a File object
  if (data.image && data.image instanceof File) {
    formData.append('image', data.image);
  }
  return http.put(`${PREFIX}/${id}`, formData, config).catch(function (error) {
    if (error) {
      return error
    }
  })
}
