// Các tiện ích để quản lý xác thực

/**
 * Lưu thông tin xác thực vào localStorage
 */
export const saveAuthData = (token: string, user: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Xóa thông tin xác thực khỏi localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Lấy token xác thực từ localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Lấy thông tin người dùng từ localStorage
 */
export const getUser = (): any => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Kiểm tra xem người dùng đã đăng nhập chưa
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Kiểm tra xem người dùng có vai trò cụ thể hay không
 */
export const hasRole = (role: string): boolean => {
  const user = getUser();
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

/**
 * Kiểm tra xem người dùng có phải là admin không
 */
export const isAdmin = (): boolean => {
  return hasRole('ROLE_ADMIN');
};

/**
 * Kiểm tra xem người dùng có phải là đối tác không
 */
export const isPartner = (): boolean => {
  return hasRole('ROLE_PARTNER');
};

/**
 * Tạo header Authorization
 */
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};