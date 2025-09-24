export class setSnackbarSuccessShowAction {
  static readonly type = '[Snackbar Success] Set Snackbar Status';
  constructor(
    readonly status: boolean,
    readonly message: string
  ) {}
}
export class setSnackbarErrorShowAction {
  static readonly type = '[Snackbar Error] Set Snackbar Status';
  constructor(
    readonly status: boolean,
    readonly message: string
  ) {}
}
