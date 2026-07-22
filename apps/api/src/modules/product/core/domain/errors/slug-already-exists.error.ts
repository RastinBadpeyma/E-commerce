export class SlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Product slug already exists: ${slug}`);
    this.name = 'SlugAlreadyExistsError';
  }
}
