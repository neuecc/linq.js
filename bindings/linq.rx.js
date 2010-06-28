// binding for RxJS
// ToObservable / ToEnumerable

(function (Enumerable)
{
    Enumerable.prototype.ToObservable = function ()
    {
        /// <summary>Converts an enumerable sequence to an observable sequence.</summary>
        var source = this;
        return Rx.Observable.CreateWithDisposable(function (observer)
        {
            var errorOccured = false;
            try
            {
                source.ForEach(function (x) { observer.OnNext(x) });
            }
            catch (e)
            {
                errorOccured = true;
                observer.OnError(e);
            }
            if (!errorOccured) observer.OnCompleted();

            return Rx.Disposable.Empty;
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