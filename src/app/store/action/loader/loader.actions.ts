export class setLoaderStatusAction {
  static readonly type = '[Loader] Set Status';
  constructor(readonly status: boolean) {}
}
