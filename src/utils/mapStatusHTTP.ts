export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_VALUE: 422,
    UNAUTHORIZED: 401,
  };

  return statusHTTPMap[status] ?? 500;
}