export class LoaderAction {
    static readonly type = '[Loader] Set Status';
    constructor(readonly status: boolean) { }
}
