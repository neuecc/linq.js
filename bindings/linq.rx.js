// binding for RxJS
// ToObservable / ToEnumerable

(function (Enumerable)
{
    Enumerable.prototype.ToObservable = function (scheduler)
    {
        /// <summary>Converts an enumerable sequence to an observable sequence.</summary>
        /// <param type="Optional:Rx.Scheduler" name="scheduler">Rx.Scheduler. Default is CurrentThread.</param>
        var source = this;
        if (scheduler == null) scheduler = Rx.Scheduler.CurrentThread;

        return Rx.Observable.CreateWithDisposable(function (observer)
        {
            var disposable = new Rx.BooleanDisposable();
            var enumerator = source.GetEnumerator();

            scheduler.ScheduleRecursive(function (self)
            {
                try
                {
                    if (!disposable.GetIsDisposed() && enumerator.MoveNext())
                    {
                        observer.OnNext(enumerator.Current());
                        self();
                    }
                    else
                    {
                        enumerator.Dispose();
                        observer.OnCompleted();
                    }
                }
                catch (e)
                {
                    enumerator.Dispose();
                    observer.OnError(e);
                }
            });

            return disposable;
        });
    }


    Rx.Observable.prototype.ToEnumerable = function ()
    {
        /// <summary>Converts an observable sequence to an enumerable sequence. Notice:cold observable only</summary>
        var obs = this;
        return Enumerable.Empty()
            .Let(function ()
            {
                var array = [];
                obs.Subscribe(function (x) { array.push(x) }).Dispose();
                return array;
            });
    }
})(this.Enumerable || this.jQuery.Enumerable);