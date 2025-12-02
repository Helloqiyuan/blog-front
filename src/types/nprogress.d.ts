declare module 'nprogress' {
  interface NProgressOptions {
    minimum?: number;
    template?: string;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    parent?: string;
    positionUsing?: string;
    barSelector?: string;
    spinnerSelector?: string;
  }

  interface NProgress {
    configure(options: NProgressOptions): NProgress;
    start(): NProgress;
    done(force?: boolean): NProgress;
    inc(amount?: number): NProgress;
    set(n: number): NProgress;
    remove(): void;
    isStarted(): boolean;
    status: number | null;
  }

  const nprogress: NProgress;
  export default nprogress;
}
