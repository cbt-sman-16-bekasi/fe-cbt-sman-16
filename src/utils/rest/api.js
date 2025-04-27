import { asyncUnsetAuthUser } from '../../states/authUser/action.js';

const useApi = (() => {
  // @ts-ignore
  const BASE_URL = import.meta.env.VITE_BASE_API;

  const accessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  };

  // @ts-ignore
  const logout = async () => {
    removeAccessToken();
    window.location.href = '/login';
  };

  const _fetchWithAuth = async (
    url,
    options = {},
    responseType = 'json',
    dispatch
  ) => {
    const fullUrl = `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken()}`,
      },
    });

    if (response.status === 401) {
      if (dispatch) {
        dispatch(asyncUnsetAuthUser());
      }
      await logout();
    }

    if (responseType === 'blob') {
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'downloaded-file';

      // Ekstrak filename dari header jika ada
      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename="?(.+?)"?$/);
        console.log(match);
        if (match && match[1]) {
          filename = match[1];
        }
      }
      console.log(filename);
      return {
        blob: await response.blob(),
        fileName: filename,
      };
    }

    return await response.json();
  };

  const _fetchPagination = async (
    url,
    { page = 1, size = 10, searchKey, searchValue, filter } = {}
  ) => {
    page = page + 1;
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('key', searchKey);
      params.append('value', searchValue);
    }

    if (filter) {
      let dataFilter = {};

      Object.keys(filter).forEach(
        (key) => (dataFilter[`${key}`] = filter[key])
      );
      params.append(`filter`, JSON.stringify(dataFilter));
    }

    return await _fetchWithAuth(`${url}?${params.toString()}`, {});
  };

  const _create = async ({ url, method, body }) => {
    return await useApi.fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  const _download = async ({ url, method, body }) => {
    const { blob, fileName } = await useApi.fetch(
      url,
      {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      'blob'
    );

    const urlDownload = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = urlDownload;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  const _delete = async ({ url }) => {
    return await useApi.fetch(url, {
      method: 'DELETE',
    });
  };

  const uploadFile = async ({
    url,
    method = 'POST',
    file,
    fieldName = 'file',
    extraFields = {},
  }) => {
    const formData = new FormData();
    formData.append(fieldName, file);

    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await useApi.fetch(url, {
      method,
      body: formData,
    });

    // Kalau response sudah berupa data langsung (bukan Response object)
    if (response && response.ok === false) {
      const message = response.message || 'FAILED';
      throw new Error(`Upload failed: ${message}`);
    }

    return await response; // atau response.text() sesuai API kamu
  };

  return {
    fetch: _fetchWithAuth,
    fetchPagination: _fetchPagination,
    createOrModify: _create,
    download: _download,
    delete: _delete,
    uploadFile: uploadFile,
  };
})();

export default useApi;
