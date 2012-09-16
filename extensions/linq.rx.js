// extension for RxJS

(function (root) {
    if (root.Enumerable == null) {
        throw new Error("can't find Enumerable. linq.rx.js must load after linq.js");
    }
    if (root.Rx == null) {
        throw new Error("can't find Rx. linq.rx.js must load after RxJS");
    }

    var Enumerable = root.Enumerable;
    var Rx = root.Rx;

    Enumerable.prototype.toObservable = function (scheduler) {
        /// <summary>Converts an enumerable sequence to an observable sequence.</summary>
        /// <param type="Scheduler" name="scheduler" optional="true">Rx.Scheduler. Default is CurrentThread.</param>
        var source = this;
        if (scheduler == null) scheduler = Rx.Scheduler.currentThread;

        return Rx.Observable.createWithDisposable(function (observer) {
            var disposable = new Rx.SingleAssignmentDisposable();
            var enumerator = source.getEnumerator();

            var calledOnCompleted;
            var cancelable = scheduler.scheduleRecursive(function (self) {
                var hasNext = false;
                var current;
                try {
                    if (disposable.isDisposed) return;

                    hasNext = enumerator.moveNext();
                    if (hasNext) current = enumerator.current();
                    else enumerator.dispose();
                }
                catch (e) {
                    try {
                        enumerator.dispose();
                    }
                    finally {
                        observer.onError(e);
                    }
                    return;
                }

                if (hasNext) {
                    observer.onNext(current);
                    self(); // loop
                }
                else {
                    observer.onCompleted();
                }
            });

            disposable.disposable(cancelable);

            return disposable;
        });
    };

    Rx.Observable.prototype.toEnumerable = function () {
        /// <summary>Converts an observable sequence to an enumerable sequence. Notice:cold observable only.</summary>
        var obs = this;
        return Enumerable.defer(function () {
            var array = [];
            obs.subscribe(function (x) { array.push(x) }).dispose();
            return array;
        });
    };
})(this);