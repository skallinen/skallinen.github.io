goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36582 = (function (f,blockable,meta36583){
this.f = f;
this.blockable = blockable;
this.meta36583 = meta36583;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36584,meta36583__$1){
var self__ = this;
var _36584__$1 = this;
return (new cljs.core.async.t_cljs$core$async36582(self__.f,self__.blockable,meta36583__$1));
}));

(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36584){
var self__ = this;
var _36584__$1 = this;
return self__.meta36583;
}));

(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async36582.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async36582.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta36583","meta36583",-346463841,null)], null);
}));

(cljs.core.async.t_cljs$core$async36582.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36582.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36582");

(cljs.core.async.t_cljs$core$async36582.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async36582");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36582.
 */
cljs.core.async.__GT_t_cljs$core$async36582 = (function cljs$core$async$__GT_t_cljs$core$async36582(f,blockable,meta36583){
return (new cljs.core.async.t_cljs$core$async36582(f,blockable,meta36583));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__36572 = arguments.length;
switch (G__36572) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async36582(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__36629 = arguments.length;
switch (G__36629) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__36650 = arguments.length;
switch (G__36650) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__36683 = arguments.length;
switch (G__36683) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_40204 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_40204) : fn1.call(null,val_40204));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_40204) : fn1.call(null,val_40204));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__36731 = arguments.length;
switch (G__36731) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___40212 = n;
var x_40213 = (0);
while(true){
if((x_40213 < n__5636__auto___40212)){
(a[x_40213] = x_40213);

var G__40216 = (x_40213 + (1));
x_40213 = G__40216;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36790 = (function (flag,meta36791){
this.flag = flag;
this.meta36791 = meta36791;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36792,meta36791__$1){
var self__ = this;
var _36792__$1 = this;
return (new cljs.core.async.t_cljs$core$async36790(self__.flag,meta36791__$1));
}));

(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36792){
var self__ = this;
var _36792__$1 = this;
return self__.meta36791;
}));

(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async36790.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async36790.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta36791","meta36791",-56374917,null)], null);
}));

(cljs.core.async.t_cljs$core$async36790.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36790.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36790");

(cljs.core.async.t_cljs$core$async36790.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async36790");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36790.
 */
cljs.core.async.__GT_t_cljs$core$async36790 = (function cljs$core$async$__GT_t_cljs$core$async36790(flag,meta36791){
return (new cljs.core.async.t_cljs$core$async36790(flag,meta36791));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async36790(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36854 = (function (flag,cb,meta36855){
this.flag = flag;
this.cb = cb;
this.meta36855 = meta36855;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36856,meta36855__$1){
var self__ = this;
var _36856__$1 = this;
return (new cljs.core.async.t_cljs$core$async36854(self__.flag,self__.cb,meta36855__$1));
}));

(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36856){
var self__ = this;
var _36856__$1 = this;
return self__.meta36855;
}));

(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async36854.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async36854.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta36855","meta36855",-1647579019,null)], null);
}));

(cljs.core.async.t_cljs$core$async36854.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36854.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36854");

(cljs.core.async.t_cljs$core$async36854.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async36854");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36854.
 */
cljs.core.async.__GT_t_cljs$core$async36854 = (function cljs$core$async$__GT_t_cljs$core$async36854(flag,cb,meta36855){
return (new cljs.core.async.t_cljs$core$async36854(flag,cb,meta36855));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async36854(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__36876_SHARP_){
var G__36879 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__36876_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__36879) : fret.call(null,G__36879));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__36877_SHARP_){
var G__36880 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__36877_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__36880) : fret.call(null,G__36880));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__40224 = (i + (1));
i = G__40224;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40229 = arguments.length;
var i__5770__auto___40230 = (0);
while(true){
if((i__5770__auto___40230 < len__5769__auto___40229)){
args__5775__auto__.push((arguments[i__5770__auto___40230]));

var G__40231 = (i__5770__auto___40230 + (1));
i__5770__auto___40230 = G__40231;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__36890){
var map__36891 = p__36890;
var map__36891__$1 = cljs.core.__destructure_map(map__36891);
var opts = map__36891__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq36887){
var G__36888 = cljs.core.first(seq36887);
var seq36887__$1 = cljs.core.next(seq36887);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__36888,seq36887__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__36904 = arguments.length;
switch (G__36904) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__36431__auto___40235 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_36954){
var state_val_36958 = (state_36954[(1)]);
if((state_val_36958 === (7))){
var inst_36942 = (state_36954[(2)]);
var state_36954__$1 = state_36954;
var statearr_36965_40237 = state_36954__$1;
(statearr_36965_40237[(2)] = inst_36942);

(statearr_36965_40237[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (1))){
var state_36954__$1 = state_36954;
var statearr_36966_40238 = state_36954__$1;
(statearr_36966_40238[(2)] = null);

(statearr_36966_40238[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (4))){
var inst_36919 = (state_36954[(7)]);
var inst_36919__$1 = (state_36954[(2)]);
var inst_36922 = (inst_36919__$1 == null);
var state_36954__$1 = (function (){var statearr_36967 = state_36954;
(statearr_36967[(7)] = inst_36919__$1);

return statearr_36967;
})();
if(cljs.core.truth_(inst_36922)){
var statearr_36970_40239 = state_36954__$1;
(statearr_36970_40239[(1)] = (5));

} else {
var statearr_36971_40240 = state_36954__$1;
(statearr_36971_40240[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (13))){
var state_36954__$1 = state_36954;
var statearr_36977_40241 = state_36954__$1;
(statearr_36977_40241[(2)] = null);

(statearr_36977_40241[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (6))){
var inst_36919 = (state_36954[(7)]);
var state_36954__$1 = state_36954;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36954__$1,(11),to,inst_36919);
} else {
if((state_val_36958 === (3))){
var inst_36948 = (state_36954[(2)]);
var state_36954__$1 = state_36954;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36954__$1,inst_36948);
} else {
if((state_val_36958 === (12))){
var state_36954__$1 = state_36954;
var statearr_36990_40244 = state_36954__$1;
(statearr_36990_40244[(2)] = null);

(statearr_36990_40244[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (2))){
var state_36954__$1 = state_36954;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36954__$1,(4),from);
} else {
if((state_val_36958 === (11))){
var inst_36931 = (state_36954[(2)]);
var state_36954__$1 = state_36954;
if(cljs.core.truth_(inst_36931)){
var statearr_36998_40245 = state_36954__$1;
(statearr_36998_40245[(1)] = (12));

} else {
var statearr_37000_40246 = state_36954__$1;
(statearr_37000_40246[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (9))){
var state_36954__$1 = state_36954;
var statearr_37001_40247 = state_36954__$1;
(statearr_37001_40247[(2)] = null);

(statearr_37001_40247[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (5))){
var state_36954__$1 = state_36954;
if(cljs.core.truth_(close_QMARK_)){
var statearr_37006_40250 = state_36954__$1;
(statearr_37006_40250[(1)] = (8));

} else {
var statearr_37007_40251 = state_36954__$1;
(statearr_37007_40251[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (14))){
var inst_36940 = (state_36954[(2)]);
var state_36954__$1 = state_36954;
var statearr_37012_40252 = state_36954__$1;
(statearr_37012_40252[(2)] = inst_36940);

(statearr_37012_40252[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (10))){
var inst_36928 = (state_36954[(2)]);
var state_36954__$1 = state_36954;
var statearr_37017_40253 = state_36954__$1;
(statearr_37017_40253[(2)] = inst_36928);

(statearr_37017_40253[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36958 === (8))){
var inst_36925 = cljs.core.async.close_BANG_(to);
var state_36954__$1 = state_36954;
var statearr_37019_40254 = state_36954__$1;
(statearr_37019_40254[(2)] = inst_36925);

(statearr_37019_40254[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_37021 = [null,null,null,null,null,null,null,null];
(statearr_37021[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_37021[(1)] = (1));

return statearr_37021;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_36954){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_36954);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37031){var ex__35515__auto__ = e37031;
var statearr_37032_40257 = state_36954;
(statearr_37032_40257[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_36954[(4)]))){
var statearr_37034_40258 = state_36954;
(statearr_37034_40258[(1)] = cljs.core.first((state_36954[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40260 = state_36954;
state_36954 = G__40260;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_36954){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_36954);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37041 = f__36432__auto__();
(statearr_37041[(6)] = c__36431__auto___40235);

return statearr_37041;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__37058){
var vec__37060 = p__37058;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37060,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37060,(1),null);
var job = vec__37060;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__36431__auto___40261 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37074){
var state_val_37075 = (state_37074[(1)]);
if((state_val_37075 === (1))){
var state_37074__$1 = state_37074;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37074__$1,(2),res,v);
} else {
if((state_val_37075 === (2))){
var inst_37071 = (state_37074[(2)]);
var inst_37072 = cljs.core.async.close_BANG_(res);
var state_37074__$1 = (function (){var statearr_37084 = state_37074;
(statearr_37084[(7)] = inst_37071);

return statearr_37084;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_37074__$1,inst_37072);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_37086 = [null,null,null,null,null,null,null,null];
(statearr_37086[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__);

(statearr_37086[(1)] = (1));

return statearr_37086;
});
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1 = (function (state_37074){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37074);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37087){var ex__35515__auto__ = e37087;
var statearr_37088_40262 = state_37074;
(statearr_37088_40262[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37074[(4)]))){
var statearr_37093_40263 = state_37074;
(statearr_37093_40263[(1)] = cljs.core.first((state_37074[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40264 = state_37074;
state_37074 = G__40264;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = function(state_37074){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1.call(this,state_37074);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37100 = f__36432__auto__();
(statearr_37100[(6)] = c__36431__auto___40261);

return statearr_37100;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__37110){
var vec__37112 = p__37110;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37112,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37112,(1),null);
var job = vec__37112;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___40265 = n;
var __40266 = (0);
while(true){
if((__40266 < n__5636__auto___40265)){
var G__37119_40267 = type;
var G__37119_40268__$1 = (((G__37119_40267 instanceof cljs.core.Keyword))?G__37119_40267.fqn:null);
switch (G__37119_40268__$1) {
case "compute":
var c__36431__auto___40270 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__40266,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = ((function (__40266,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function (state_37133){
var state_val_37134 = (state_37133[(1)]);
if((state_val_37134 === (1))){
var state_37133__$1 = state_37133;
var statearr_37140_40271 = state_37133__$1;
(statearr_37140_40271[(2)] = null);

(statearr_37140_40271[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37134 === (2))){
var state_37133__$1 = state_37133;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37133__$1,(4),jobs);
} else {
if((state_val_37134 === (3))){
var inst_37131 = (state_37133[(2)]);
var state_37133__$1 = state_37133;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37133__$1,inst_37131);
} else {
if((state_val_37134 === (4))){
var inst_37123 = (state_37133[(2)]);
var inst_37124 = process__$1(inst_37123);
var state_37133__$1 = state_37133;
if(cljs.core.truth_(inst_37124)){
var statearr_37141_40274 = state_37133__$1;
(statearr_37141_40274[(1)] = (5));

} else {
var statearr_37143_40276 = state_37133__$1;
(statearr_37143_40276[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37134 === (5))){
var state_37133__$1 = state_37133;
var statearr_37144_40278 = state_37133__$1;
(statearr_37144_40278[(2)] = null);

(statearr_37144_40278[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37134 === (6))){
var state_37133__$1 = state_37133;
var statearr_37146_40279 = state_37133__$1;
(statearr_37146_40279[(2)] = null);

(statearr_37146_40279[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37134 === (7))){
var inst_37129 = (state_37133[(2)]);
var state_37133__$1 = state_37133;
var statearr_37150_40280 = state_37133__$1;
(statearr_37150_40280[(2)] = inst_37129);

(statearr_37150_40280[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__40266,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
;
return ((function (__40266,switch__35511__auto__,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_37153 = [null,null,null,null,null,null,null];
(statearr_37153[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__);

(statearr_37153[(1)] = (1));

return statearr_37153;
});
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1 = (function (state_37133){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37133);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37155){var ex__35515__auto__ = e37155;
var statearr_37156_40282 = state_37133;
(statearr_37156_40282[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37133[(4)]))){
var statearr_37157_40283 = state_37133;
(statearr_37157_40283[(1)] = cljs.core.first((state_37133[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40285 = state_37133;
state_37133 = G__40285;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = function(state_37133){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1.call(this,state_37133);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__;
})()
;})(__40266,switch__35511__auto__,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
})();
var state__36433__auto__ = (function (){var statearr_37182 = f__36432__auto__();
(statearr_37182[(6)] = c__36431__auto___40270);

return statearr_37182;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
});})(__40266,c__36431__auto___40270,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
);


break;
case "async":
var c__36431__auto___40286 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__40266,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = ((function (__40266,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function (state_37195){
var state_val_37196 = (state_37195[(1)]);
if((state_val_37196 === (1))){
var state_37195__$1 = state_37195;
var statearr_37197_40287 = state_37195__$1;
(statearr_37197_40287[(2)] = null);

(statearr_37197_40287[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37196 === (2))){
var state_37195__$1 = state_37195;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37195__$1,(4),jobs);
} else {
if((state_val_37196 === (3))){
var inst_37193 = (state_37195[(2)]);
var state_37195__$1 = state_37195;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37195__$1,inst_37193);
} else {
if((state_val_37196 === (4))){
var inst_37185 = (state_37195[(2)]);
var inst_37186 = async(inst_37185);
var state_37195__$1 = state_37195;
if(cljs.core.truth_(inst_37186)){
var statearr_37200_40288 = state_37195__$1;
(statearr_37200_40288[(1)] = (5));

} else {
var statearr_37201_40289 = state_37195__$1;
(statearr_37201_40289[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37196 === (5))){
var state_37195__$1 = state_37195;
var statearr_37204_40292 = state_37195__$1;
(statearr_37204_40292[(2)] = null);

(statearr_37204_40292[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37196 === (6))){
var state_37195__$1 = state_37195;
var statearr_37205_40293 = state_37195__$1;
(statearr_37205_40293[(2)] = null);

(statearr_37205_40293[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37196 === (7))){
var inst_37191 = (state_37195[(2)]);
var state_37195__$1 = state_37195;
var statearr_37206_40294 = state_37195__$1;
(statearr_37206_40294[(2)] = inst_37191);

(statearr_37206_40294[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__40266,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
;
return ((function (__40266,switch__35511__auto__,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_37210 = [null,null,null,null,null,null,null];
(statearr_37210[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__);

(statearr_37210[(1)] = (1));

return statearr_37210;
});
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1 = (function (state_37195){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37195);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37211){var ex__35515__auto__ = e37211;
var statearr_37213_40300 = state_37195;
(statearr_37213_40300[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37195[(4)]))){
var statearr_37214_40301 = state_37195;
(statearr_37214_40301[(1)] = cljs.core.first((state_37195[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40303 = state_37195;
state_37195 = G__40303;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = function(state_37195){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1.call(this,state_37195);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__;
})()
;})(__40266,switch__35511__auto__,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
})();
var state__36433__auto__ = (function (){var statearr_37216 = f__36432__auto__();
(statearr_37216[(6)] = c__36431__auto___40286);

return statearr_37216;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
});})(__40266,c__36431__auto___40286,G__37119_40267,G__37119_40268__$1,n__5636__auto___40265,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__37119_40268__$1)].join('')));

}

var G__40304 = (__40266 + (1));
__40266 = G__40304;
continue;
} else {
}
break;
}

var c__36431__auto___40306 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37248){
var state_val_37249 = (state_37248[(1)]);
if((state_val_37249 === (7))){
var inst_37244 = (state_37248[(2)]);
var state_37248__$1 = state_37248;
var statearr_37250_40311 = state_37248__$1;
(statearr_37250_40311[(2)] = inst_37244);

(statearr_37250_40311[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37249 === (1))){
var state_37248__$1 = state_37248;
var statearr_37251_40313 = state_37248__$1;
(statearr_37251_40313[(2)] = null);

(statearr_37251_40313[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37249 === (4))){
var inst_37223 = (state_37248[(7)]);
var inst_37223__$1 = (state_37248[(2)]);
var inst_37224 = (inst_37223__$1 == null);
var state_37248__$1 = (function (){var statearr_37252 = state_37248;
(statearr_37252[(7)] = inst_37223__$1);

return statearr_37252;
})();
if(cljs.core.truth_(inst_37224)){
var statearr_37253_40314 = state_37248__$1;
(statearr_37253_40314[(1)] = (5));

} else {
var statearr_37258_40315 = state_37248__$1;
(statearr_37258_40315[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37249 === (6))){
var inst_37223 = (state_37248[(7)]);
var inst_37228 = (state_37248[(8)]);
var inst_37228__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_37231 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_37236 = [inst_37223,inst_37228__$1];
var inst_37237 = (new cljs.core.PersistentVector(null,2,(5),inst_37231,inst_37236,null));
var state_37248__$1 = (function (){var statearr_37264 = state_37248;
(statearr_37264[(8)] = inst_37228__$1);

return statearr_37264;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37248__$1,(8),jobs,inst_37237);
} else {
if((state_val_37249 === (3))){
var inst_37246 = (state_37248[(2)]);
var state_37248__$1 = state_37248;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37248__$1,inst_37246);
} else {
if((state_val_37249 === (2))){
var state_37248__$1 = state_37248;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37248__$1,(4),from);
} else {
if((state_val_37249 === (9))){
var inst_37241 = (state_37248[(2)]);
var state_37248__$1 = (function (){var statearr_37270 = state_37248;
(statearr_37270[(9)] = inst_37241);

return statearr_37270;
})();
var statearr_37271_40316 = state_37248__$1;
(statearr_37271_40316[(2)] = null);

(statearr_37271_40316[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37249 === (5))){
var inst_37226 = cljs.core.async.close_BANG_(jobs);
var state_37248__$1 = state_37248;
var statearr_37278_40317 = state_37248__$1;
(statearr_37278_40317[(2)] = inst_37226);

(statearr_37278_40317[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37249 === (8))){
var inst_37228 = (state_37248[(8)]);
var inst_37239 = (state_37248[(2)]);
var state_37248__$1 = (function (){var statearr_37279 = state_37248;
(statearr_37279[(10)] = inst_37239);

return statearr_37279;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37248__$1,(9),results,inst_37228);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_37281 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_37281[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__);

(statearr_37281[(1)] = (1));

return statearr_37281;
});
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1 = (function (state_37248){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37248);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37287){var ex__35515__auto__ = e37287;
var statearr_37288_40320 = state_37248;
(statearr_37288_40320[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37248[(4)]))){
var statearr_37289_40321 = state_37248;
(statearr_37289_40321[(1)] = cljs.core.first((state_37248[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40322 = state_37248;
state_37248 = G__40322;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = function(state_37248){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1.call(this,state_37248);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37292 = f__36432__auto__();
(statearr_37292[(6)] = c__36431__auto___40306);

return statearr_37292;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


var c__36431__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37349){
var state_val_37350 = (state_37349[(1)]);
if((state_val_37350 === (7))){
var inst_37339 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
var statearr_37369_40323 = state_37349__$1;
(statearr_37369_40323[(2)] = inst_37339);

(statearr_37369_40323[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (20))){
var state_37349__$1 = state_37349;
var statearr_37378_40324 = state_37349__$1;
(statearr_37378_40324[(2)] = null);

(statearr_37378_40324[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (1))){
var state_37349__$1 = state_37349;
var statearr_37382_40325 = state_37349__$1;
(statearr_37382_40325[(2)] = null);

(statearr_37382_40325[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (4))){
var inst_37298 = (state_37349[(7)]);
var inst_37298__$1 = (state_37349[(2)]);
var inst_37299 = (inst_37298__$1 == null);
var state_37349__$1 = (function (){var statearr_37389 = state_37349;
(statearr_37389[(7)] = inst_37298__$1);

return statearr_37389;
})();
if(cljs.core.truth_(inst_37299)){
var statearr_37390_40326 = state_37349__$1;
(statearr_37390_40326[(1)] = (5));

} else {
var statearr_37391_40327 = state_37349__$1;
(statearr_37391_40327[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (15))){
var inst_37311 = (state_37349[(8)]);
var state_37349__$1 = state_37349;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37349__$1,(18),to,inst_37311);
} else {
if((state_val_37350 === (21))){
var inst_37327 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
var statearr_37398_40329 = state_37349__$1;
(statearr_37398_40329[(2)] = inst_37327);

(statearr_37398_40329[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (13))){
var inst_37330 = (state_37349[(2)]);
var state_37349__$1 = (function (){var statearr_37399 = state_37349;
(statearr_37399[(9)] = inst_37330);

return statearr_37399;
})();
var statearr_37400_40330 = state_37349__$1;
(statearr_37400_40330[(2)] = null);

(statearr_37400_40330[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (6))){
var inst_37298 = (state_37349[(7)]);
var state_37349__$1 = state_37349;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37349__$1,(11),inst_37298);
} else {
if((state_val_37350 === (17))){
var inst_37322 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
if(cljs.core.truth_(inst_37322)){
var statearr_37406_40331 = state_37349__$1;
(statearr_37406_40331[(1)] = (19));

} else {
var statearr_37408_40332 = state_37349__$1;
(statearr_37408_40332[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (3))){
var inst_37341 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37349__$1,inst_37341);
} else {
if((state_val_37350 === (12))){
var inst_37308 = (state_37349[(10)]);
var state_37349__$1 = state_37349;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37349__$1,(14),inst_37308);
} else {
if((state_val_37350 === (2))){
var state_37349__$1 = state_37349;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37349__$1,(4),results);
} else {
if((state_val_37350 === (19))){
var state_37349__$1 = state_37349;
var statearr_37417_40333 = state_37349__$1;
(statearr_37417_40333[(2)] = null);

(statearr_37417_40333[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (11))){
var inst_37308 = (state_37349[(2)]);
var state_37349__$1 = (function (){var statearr_37419 = state_37349;
(statearr_37419[(10)] = inst_37308);

return statearr_37419;
})();
var statearr_37420_40334 = state_37349__$1;
(statearr_37420_40334[(2)] = null);

(statearr_37420_40334[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (9))){
var state_37349__$1 = state_37349;
var statearr_37423_40337 = state_37349__$1;
(statearr_37423_40337[(2)] = null);

(statearr_37423_40337[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (5))){
var state_37349__$1 = state_37349;
if(cljs.core.truth_(close_QMARK_)){
var statearr_37427_40338 = state_37349__$1;
(statearr_37427_40338[(1)] = (8));

} else {
var statearr_37428_40340 = state_37349__$1;
(statearr_37428_40340[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (14))){
var inst_37315 = (state_37349[(11)]);
var inst_37311 = (state_37349[(8)]);
var inst_37311__$1 = (state_37349[(2)]);
var inst_37314 = (inst_37311__$1 == null);
var inst_37315__$1 = cljs.core.not(inst_37314);
var state_37349__$1 = (function (){var statearr_37431 = state_37349;
(statearr_37431[(11)] = inst_37315__$1);

(statearr_37431[(8)] = inst_37311__$1);

return statearr_37431;
})();
if(inst_37315__$1){
var statearr_37432_40342 = state_37349__$1;
(statearr_37432_40342[(1)] = (15));

} else {
var statearr_37433_40343 = state_37349__$1;
(statearr_37433_40343[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (16))){
var inst_37315 = (state_37349[(11)]);
var state_37349__$1 = state_37349;
var statearr_37435_40344 = state_37349__$1;
(statearr_37435_40344[(2)] = inst_37315);

(statearr_37435_40344[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (10))){
var inst_37305 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
var statearr_37437_40345 = state_37349__$1;
(statearr_37437_40345[(2)] = inst_37305);

(statearr_37437_40345[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (18))){
var inst_37319 = (state_37349[(2)]);
var state_37349__$1 = state_37349;
var statearr_37439_40346 = state_37349__$1;
(statearr_37439_40346[(2)] = inst_37319);

(statearr_37439_40346[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37350 === (8))){
var inst_37302 = cljs.core.async.close_BANG_(to);
var state_37349__$1 = state_37349;
var statearr_37444_40347 = state_37349__$1;
(statearr_37444_40347[(2)] = inst_37302);

(statearr_37444_40347[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_37448 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37448[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__);

(statearr_37448[(1)] = (1));

return statearr_37448;
});
var cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1 = (function (state_37349){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37349);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37451){var ex__35515__auto__ = e37451;
var statearr_37452_40353 = state_37349;
(statearr_37452_40353[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37349[(4)]))){
var statearr_37453_40354 = state_37349;
(statearr_37453_40354[(1)] = cljs.core.first((state_37349[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40357 = state_37349;
state_37349 = G__40357;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__ = function(state_37349){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1.call(this,state_37349);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37455 = f__36432__auto__();
(statearr_37455[(6)] = c__36431__auto__);

return statearr_37455;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

return c__36431__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__37459 = arguments.length;
switch (G__37459) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__37466 = arguments.length;
switch (G__37466) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__37486 = arguments.length;
switch (G__37486) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__36431__auto___40366 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37521){
var state_val_37522 = (state_37521[(1)]);
if((state_val_37522 === (7))){
var inst_37517 = (state_37521[(2)]);
var state_37521__$1 = state_37521;
var statearr_37531_40367 = state_37521__$1;
(statearr_37531_40367[(2)] = inst_37517);

(statearr_37531_40367[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (1))){
var state_37521__$1 = state_37521;
var statearr_37536_40368 = state_37521__$1;
(statearr_37536_40368[(2)] = null);

(statearr_37536_40368[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (4))){
var inst_37498 = (state_37521[(7)]);
var inst_37498__$1 = (state_37521[(2)]);
var inst_37499 = (inst_37498__$1 == null);
var state_37521__$1 = (function (){var statearr_37538 = state_37521;
(statearr_37538[(7)] = inst_37498__$1);

return statearr_37538;
})();
if(cljs.core.truth_(inst_37499)){
var statearr_37542_40369 = state_37521__$1;
(statearr_37542_40369[(1)] = (5));

} else {
var statearr_37543_40370 = state_37521__$1;
(statearr_37543_40370[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (13))){
var state_37521__$1 = state_37521;
var statearr_37544_40372 = state_37521__$1;
(statearr_37544_40372[(2)] = null);

(statearr_37544_40372[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (6))){
var inst_37498 = (state_37521[(7)]);
var inst_37504 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_37498) : p.call(null,inst_37498));
var state_37521__$1 = state_37521;
if(cljs.core.truth_(inst_37504)){
var statearr_37545_40373 = state_37521__$1;
(statearr_37545_40373[(1)] = (9));

} else {
var statearr_37546_40374 = state_37521__$1;
(statearr_37546_40374[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (3))){
var inst_37519 = (state_37521[(2)]);
var state_37521__$1 = state_37521;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37521__$1,inst_37519);
} else {
if((state_val_37522 === (12))){
var state_37521__$1 = state_37521;
var statearr_37547_40375 = state_37521__$1;
(statearr_37547_40375[(2)] = null);

(statearr_37547_40375[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (2))){
var state_37521__$1 = state_37521;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37521__$1,(4),ch);
} else {
if((state_val_37522 === (11))){
var inst_37498 = (state_37521[(7)]);
var inst_37508 = (state_37521[(2)]);
var state_37521__$1 = state_37521;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37521__$1,(8),inst_37508,inst_37498);
} else {
if((state_val_37522 === (9))){
var state_37521__$1 = state_37521;
var statearr_37555_40378 = state_37521__$1;
(statearr_37555_40378[(2)] = tc);

(statearr_37555_40378[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (5))){
var inst_37501 = cljs.core.async.close_BANG_(tc);
var inst_37502 = cljs.core.async.close_BANG_(fc);
var state_37521__$1 = (function (){var statearr_37556 = state_37521;
(statearr_37556[(8)] = inst_37501);

return statearr_37556;
})();
var statearr_37559_40381 = state_37521__$1;
(statearr_37559_40381[(2)] = inst_37502);

(statearr_37559_40381[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (14))){
var inst_37515 = (state_37521[(2)]);
var state_37521__$1 = state_37521;
var statearr_37571_40382 = state_37521__$1;
(statearr_37571_40382[(2)] = inst_37515);

(statearr_37571_40382[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (10))){
var state_37521__$1 = state_37521;
var statearr_37577_40383 = state_37521__$1;
(statearr_37577_40383[(2)] = fc);

(statearr_37577_40383[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37522 === (8))){
var inst_37510 = (state_37521[(2)]);
var state_37521__$1 = state_37521;
if(cljs.core.truth_(inst_37510)){
var statearr_37581_40384 = state_37521__$1;
(statearr_37581_40384[(1)] = (12));

} else {
var statearr_37583_40386 = state_37521__$1;
(statearr_37583_40386[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_37587 = [null,null,null,null,null,null,null,null,null];
(statearr_37587[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_37587[(1)] = (1));

return statearr_37587;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_37521){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37521);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37589){var ex__35515__auto__ = e37589;
var statearr_37590_40387 = state_37521;
(statearr_37590_40387[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37521[(4)]))){
var statearr_37593_40389 = state_37521;
(statearr_37593_40389[(1)] = cljs.core.first((state_37521[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40390 = state_37521;
state_37521 = G__40390;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_37521){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_37521);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37597 = f__36432__auto__();
(statearr_37597[(6)] = c__36431__auto___40366);

return statearr_37597;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__36431__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37636){
var state_val_37637 = (state_37636[(1)]);
if((state_val_37637 === (7))){
var inst_37631 = (state_37636[(2)]);
var state_37636__$1 = state_37636;
var statearr_37638_40392 = state_37636__$1;
(statearr_37638_40392[(2)] = inst_37631);

(statearr_37638_40392[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (1))){
var inst_37601 = init;
var inst_37606 = inst_37601;
var state_37636__$1 = (function (){var statearr_37639 = state_37636;
(statearr_37639[(7)] = inst_37606);

return statearr_37639;
})();
var statearr_37640_40393 = state_37636__$1;
(statearr_37640_40393[(2)] = null);

(statearr_37640_40393[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (4))){
var inst_37614 = (state_37636[(8)]);
var inst_37614__$1 = (state_37636[(2)]);
var inst_37615 = (inst_37614__$1 == null);
var state_37636__$1 = (function (){var statearr_37644 = state_37636;
(statearr_37644[(8)] = inst_37614__$1);

return statearr_37644;
})();
if(cljs.core.truth_(inst_37615)){
var statearr_37648_40394 = state_37636__$1;
(statearr_37648_40394[(1)] = (5));

} else {
var statearr_37652_40395 = state_37636__$1;
(statearr_37652_40395[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (6))){
var inst_37622 = (state_37636[(9)]);
var inst_37606 = (state_37636[(7)]);
var inst_37614 = (state_37636[(8)]);
var inst_37622__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_37606,inst_37614) : f.call(null,inst_37606,inst_37614));
var inst_37623 = cljs.core.reduced_QMARK_(inst_37622__$1);
var state_37636__$1 = (function (){var statearr_37653 = state_37636;
(statearr_37653[(9)] = inst_37622__$1);

return statearr_37653;
})();
if(inst_37623){
var statearr_37654_40397 = state_37636__$1;
(statearr_37654_40397[(1)] = (8));

} else {
var statearr_37655_40398 = state_37636__$1;
(statearr_37655_40398[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (3))){
var inst_37634 = (state_37636[(2)]);
var state_37636__$1 = state_37636;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37636__$1,inst_37634);
} else {
if((state_val_37637 === (2))){
var state_37636__$1 = state_37636;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37636__$1,(4),ch);
} else {
if((state_val_37637 === (9))){
var inst_37622 = (state_37636[(9)]);
var inst_37606 = inst_37622;
var state_37636__$1 = (function (){var statearr_37662 = state_37636;
(statearr_37662[(7)] = inst_37606);

return statearr_37662;
})();
var statearr_37665_40399 = state_37636__$1;
(statearr_37665_40399[(2)] = null);

(statearr_37665_40399[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (5))){
var inst_37606 = (state_37636[(7)]);
var state_37636__$1 = state_37636;
var statearr_37669_40400 = state_37636__$1;
(statearr_37669_40400[(2)] = inst_37606);

(statearr_37669_40400[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (10))){
var inst_37629 = (state_37636[(2)]);
var state_37636__$1 = state_37636;
var statearr_37671_40407 = state_37636__$1;
(statearr_37671_40407[(2)] = inst_37629);

(statearr_37671_40407[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37637 === (8))){
var inst_37622 = (state_37636[(9)]);
var inst_37625 = cljs.core.deref(inst_37622);
var state_37636__$1 = state_37636;
var statearr_37673_40408 = state_37636__$1;
(statearr_37673_40408[(2)] = inst_37625);

(statearr_37673_40408[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__35512__auto__ = null;
var cljs$core$async$reduce_$_state_machine__35512__auto____0 = (function (){
var statearr_37676 = [null,null,null,null,null,null,null,null,null,null];
(statearr_37676[(0)] = cljs$core$async$reduce_$_state_machine__35512__auto__);

(statearr_37676[(1)] = (1));

return statearr_37676;
});
var cljs$core$async$reduce_$_state_machine__35512__auto____1 = (function (state_37636){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37636);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37680){var ex__35515__auto__ = e37680;
var statearr_37681_40410 = state_37636;
(statearr_37681_40410[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37636[(4)]))){
var statearr_37682_40411 = state_37636;
(statearr_37682_40411[(1)] = cljs.core.first((state_37636[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40413 = state_37636;
state_37636 = G__40413;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__35512__auto__ = function(state_37636){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__35512__auto____1.call(this,state_37636);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__35512__auto____0;
cljs$core$async$reduce_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__35512__auto____1;
return cljs$core$async$reduce_$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37684 = f__36432__auto__();
(statearr_37684[(6)] = c__36431__auto__);

return statearr_37684;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

return c__36431__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__36431__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37693){
var state_val_37695 = (state_37693[(1)]);
if((state_val_37695 === (1))){
var inst_37687 = cljs.core.async.reduce(f__$1,init,ch);
var state_37693__$1 = state_37693;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37693__$1,(2),inst_37687);
} else {
if((state_val_37695 === (2))){
var inst_37689 = (state_37693[(2)]);
var inst_37690 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_37689) : f__$1.call(null,inst_37689));
var state_37693__$1 = state_37693;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37693__$1,inst_37690);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__35512__auto__ = null;
var cljs$core$async$transduce_$_state_machine__35512__auto____0 = (function (){
var statearr_37700 = [null,null,null,null,null,null,null];
(statearr_37700[(0)] = cljs$core$async$transduce_$_state_machine__35512__auto__);

(statearr_37700[(1)] = (1));

return statearr_37700;
});
var cljs$core$async$transduce_$_state_machine__35512__auto____1 = (function (state_37693){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37693);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37704){var ex__35515__auto__ = e37704;
var statearr_37705_40421 = state_37693;
(statearr_37705_40421[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37693[(4)]))){
var statearr_37706_40422 = state_37693;
(statearr_37706_40422[(1)] = cljs.core.first((state_37693[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40423 = state_37693;
state_37693 = G__40423;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__35512__auto__ = function(state_37693){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__35512__auto____1.call(this,state_37693);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__35512__auto____0;
cljs$core$async$transduce_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__35512__auto____1;
return cljs$core$async$transduce_$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37713 = f__36432__auto__();
(statearr_37713[(6)] = c__36431__auto__);

return statearr_37713;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

return c__36431__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__37716 = arguments.length;
switch (G__37716) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__36431__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_37748){
var state_val_37749 = (state_37748[(1)]);
if((state_val_37749 === (7))){
var inst_37730 = (state_37748[(2)]);
var state_37748__$1 = state_37748;
var statearr_37751_40426 = state_37748__$1;
(statearr_37751_40426[(2)] = inst_37730);

(statearr_37751_40426[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (1))){
var inst_37724 = cljs.core.seq(coll);
var inst_37725 = inst_37724;
var state_37748__$1 = (function (){var statearr_37753 = state_37748;
(statearr_37753[(7)] = inst_37725);

return statearr_37753;
})();
var statearr_37754_40428 = state_37748__$1;
(statearr_37754_40428[(2)] = null);

(statearr_37754_40428[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (4))){
var inst_37725 = (state_37748[(7)]);
var inst_37728 = cljs.core.first(inst_37725);
var state_37748__$1 = state_37748;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37748__$1,(7),ch,inst_37728);
} else {
if((state_val_37749 === (13))){
var inst_37742 = (state_37748[(2)]);
var state_37748__$1 = state_37748;
var statearr_37755_40429 = state_37748__$1;
(statearr_37755_40429[(2)] = inst_37742);

(statearr_37755_40429[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (6))){
var inst_37733 = (state_37748[(2)]);
var state_37748__$1 = state_37748;
if(cljs.core.truth_(inst_37733)){
var statearr_37757_40430 = state_37748__$1;
(statearr_37757_40430[(1)] = (8));

} else {
var statearr_37758_40431 = state_37748__$1;
(statearr_37758_40431[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (3))){
var inst_37746 = (state_37748[(2)]);
var state_37748__$1 = state_37748;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37748__$1,inst_37746);
} else {
if((state_val_37749 === (12))){
var state_37748__$1 = state_37748;
var statearr_37760_40432 = state_37748__$1;
(statearr_37760_40432[(2)] = null);

(statearr_37760_40432[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (2))){
var inst_37725 = (state_37748[(7)]);
var state_37748__$1 = state_37748;
if(cljs.core.truth_(inst_37725)){
var statearr_37764_40434 = state_37748__$1;
(statearr_37764_40434[(1)] = (4));

} else {
var statearr_37765_40435 = state_37748__$1;
(statearr_37765_40435[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (11))){
var inst_37739 = cljs.core.async.close_BANG_(ch);
var state_37748__$1 = state_37748;
var statearr_37766_40436 = state_37748__$1;
(statearr_37766_40436[(2)] = inst_37739);

(statearr_37766_40436[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (9))){
var state_37748__$1 = state_37748;
if(cljs.core.truth_(close_QMARK_)){
var statearr_37768_40437 = state_37748__$1;
(statearr_37768_40437[(1)] = (11));

} else {
var statearr_37769_40438 = state_37748__$1;
(statearr_37769_40438[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (5))){
var inst_37725 = (state_37748[(7)]);
var state_37748__$1 = state_37748;
var statearr_37770_40439 = state_37748__$1;
(statearr_37770_40439[(2)] = inst_37725);

(statearr_37770_40439[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (10))){
var inst_37744 = (state_37748[(2)]);
var state_37748__$1 = state_37748;
var statearr_37771_40440 = state_37748__$1;
(statearr_37771_40440[(2)] = inst_37744);

(statearr_37771_40440[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37749 === (8))){
var inst_37725 = (state_37748[(7)]);
var inst_37735 = cljs.core.next(inst_37725);
var inst_37725__$1 = inst_37735;
var state_37748__$1 = (function (){var statearr_37772 = state_37748;
(statearr_37772[(7)] = inst_37725__$1);

return statearr_37772;
})();
var statearr_37774_40441 = state_37748__$1;
(statearr_37774_40441[(2)] = null);

(statearr_37774_40441[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_37775 = [null,null,null,null,null,null,null,null];
(statearr_37775[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_37775[(1)] = (1));

return statearr_37775;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_37748){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_37748);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e37779){var ex__35515__auto__ = e37779;
var statearr_37780_40442 = state_37748;
(statearr_37780_40442[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_37748[(4)]))){
var statearr_37781_40443 = state_37748;
(statearr_37781_40443[(1)] = cljs.core.first((state_37748[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40444 = state_37748;
state_37748 = G__40444;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_37748){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_37748);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_37782 = f__36432__auto__();
(statearr_37782[(6)] = c__36431__auto__);

return statearr_37782;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

return c__36431__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__37784 = arguments.length;
switch (G__37784) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_40448 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_40448(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_40450 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_40450(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_40451 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_40451(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_40453 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_40453(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async37831 = (function (ch,cs,meta37832){
this.ch = ch;
this.cs = cs;
this.meta37832 = meta37832;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_37833,meta37832__$1){
var self__ = this;
var _37833__$1 = this;
return (new cljs.core.async.t_cljs$core$async37831(self__.ch,self__.cs,meta37832__$1));
}));

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_37833){
var self__ = this;
var _37833__$1 = this;
return self__.meta37832;
}));

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async37831.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async37831.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta37832","meta37832",-2099024844,null)], null);
}));

(cljs.core.async.t_cljs$core$async37831.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async37831.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async37831");

(cljs.core.async.t_cljs$core$async37831.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async37831");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async37831.
 */
cljs.core.async.__GT_t_cljs$core$async37831 = (function cljs$core$async$__GT_t_cljs$core$async37831(ch,cs,meta37832){
return (new cljs.core.async.t_cljs$core$async37831(ch,cs,meta37832));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async37831(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__36431__auto___40457 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_38060){
var state_val_38061 = (state_38060[(1)]);
if((state_val_38061 === (7))){
var inst_38049 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38068_40459 = state_38060__$1;
(statearr_38068_40459[(2)] = inst_38049);

(statearr_38068_40459[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (20))){
var inst_37927 = (state_38060[(7)]);
var inst_37939 = cljs.core.first(inst_37927);
var inst_37940 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_37939,(0),null);
var inst_37941 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_37939,(1),null);
var state_38060__$1 = (function (){var statearr_38069 = state_38060;
(statearr_38069[(8)] = inst_37940);

return statearr_38069;
})();
if(cljs.core.truth_(inst_37941)){
var statearr_38070_40460 = state_38060__$1;
(statearr_38070_40460[(1)] = (22));

} else {
var statearr_38077_40461 = state_38060__$1;
(statearr_38077_40461[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (27))){
var inst_37983 = (state_38060[(9)]);
var inst_37874 = (state_38060[(10)]);
var inst_37974 = (state_38060[(11)]);
var inst_37972 = (state_38060[(12)]);
var inst_37983__$1 = cljs.core._nth(inst_37972,inst_37974);
var inst_37988 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_37983__$1,inst_37874,done);
var state_38060__$1 = (function (){var statearr_38081 = state_38060;
(statearr_38081[(9)] = inst_37983__$1);

return statearr_38081;
})();
if(cljs.core.truth_(inst_37988)){
var statearr_38084_40466 = state_38060__$1;
(statearr_38084_40466[(1)] = (30));

} else {
var statearr_38085_40467 = state_38060__$1;
(statearr_38085_40467[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (1))){
var state_38060__$1 = state_38060;
var statearr_38087_40468 = state_38060__$1;
(statearr_38087_40468[(2)] = null);

(statearr_38087_40468[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (24))){
var inst_37927 = (state_38060[(7)]);
var inst_37946 = (state_38060[(2)]);
var inst_37949 = cljs.core.next(inst_37927);
var inst_37892 = inst_37949;
var inst_37893 = null;
var inst_37894 = (0);
var inst_37895 = (0);
var state_38060__$1 = (function (){var statearr_38088 = state_38060;
(statearr_38088[(13)] = inst_37892);

(statearr_38088[(14)] = inst_37894);

(statearr_38088[(15)] = inst_37895);

(statearr_38088[(16)] = inst_37893);

(statearr_38088[(17)] = inst_37946);

return statearr_38088;
})();
var statearr_38089_40478 = state_38060__$1;
(statearr_38089_40478[(2)] = null);

(statearr_38089_40478[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (39))){
var state_38060__$1 = state_38060;
var statearr_38107_40480 = state_38060__$1;
(statearr_38107_40480[(2)] = null);

(statearr_38107_40480[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (4))){
var inst_37874 = (state_38060[(10)]);
var inst_37874__$1 = (state_38060[(2)]);
var inst_37875 = (inst_37874__$1 == null);
var state_38060__$1 = (function (){var statearr_38109 = state_38060;
(statearr_38109[(10)] = inst_37874__$1);

return statearr_38109;
})();
if(cljs.core.truth_(inst_37875)){
var statearr_38110_40485 = state_38060__$1;
(statearr_38110_40485[(1)] = (5));

} else {
var statearr_38111_40486 = state_38060__$1;
(statearr_38111_40486[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (15))){
var inst_37892 = (state_38060[(13)]);
var inst_37894 = (state_38060[(14)]);
var inst_37895 = (state_38060[(15)]);
var inst_37893 = (state_38060[(16)]);
var inst_37923 = (state_38060[(2)]);
var inst_37924 = (inst_37895 + (1));
var tmp38092 = inst_37892;
var tmp38093 = inst_37894;
var tmp38094 = inst_37893;
var inst_37892__$1 = tmp38092;
var inst_37893__$1 = tmp38094;
var inst_37894__$1 = tmp38093;
var inst_37895__$1 = inst_37924;
var state_38060__$1 = (function (){var statearr_38116 = state_38060;
(statearr_38116[(13)] = inst_37892__$1);

(statearr_38116[(14)] = inst_37894__$1);

(statearr_38116[(15)] = inst_37895__$1);

(statearr_38116[(18)] = inst_37923);

(statearr_38116[(16)] = inst_37893__$1);

return statearr_38116;
})();
var statearr_38117_40495 = state_38060__$1;
(statearr_38117_40495[(2)] = null);

(statearr_38117_40495[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (21))){
var inst_37952 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38121_40498 = state_38060__$1;
(statearr_38121_40498[(2)] = inst_37952);

(statearr_38121_40498[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (31))){
var inst_37983 = (state_38060[(9)]);
var inst_37994 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_37983);
var state_38060__$1 = state_38060;
var statearr_38122_40501 = state_38060__$1;
(statearr_38122_40501[(2)] = inst_37994);

(statearr_38122_40501[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (32))){
var inst_37971 = (state_38060[(19)]);
var inst_37974 = (state_38060[(11)]);
var inst_37973 = (state_38060[(20)]);
var inst_37972 = (state_38060[(12)]);
var inst_37996 = (state_38060[(2)]);
var inst_38000 = (inst_37974 + (1));
var tmp38118 = inst_37971;
var tmp38119 = inst_37973;
var tmp38120 = inst_37972;
var inst_37971__$1 = tmp38118;
var inst_37972__$1 = tmp38120;
var inst_37973__$1 = tmp38119;
var inst_37974__$1 = inst_38000;
var state_38060__$1 = (function (){var statearr_38123 = state_38060;
(statearr_38123[(19)] = inst_37971__$1);

(statearr_38123[(21)] = inst_37996);

(statearr_38123[(11)] = inst_37974__$1);

(statearr_38123[(20)] = inst_37973__$1);

(statearr_38123[(12)] = inst_37972__$1);

return statearr_38123;
})();
var statearr_38124_40504 = state_38060__$1;
(statearr_38124_40504[(2)] = null);

(statearr_38124_40504[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (40))){
var inst_38020 = (state_38060[(22)]);
var inst_38024 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_38020);
var state_38060__$1 = state_38060;
var statearr_38133_40505 = state_38060__$1;
(statearr_38133_40505[(2)] = inst_38024);

(statearr_38133_40505[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (33))){
var inst_38004 = (state_38060[(23)]);
var inst_38011 = cljs.core.chunked_seq_QMARK_(inst_38004);
var state_38060__$1 = state_38060;
if(inst_38011){
var statearr_38143_40506 = state_38060__$1;
(statearr_38143_40506[(1)] = (36));

} else {
var statearr_38146_40507 = state_38060__$1;
(statearr_38146_40507[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (13))){
var inst_37911 = (state_38060[(24)]);
var inst_37920 = cljs.core.async.close_BANG_(inst_37911);
var state_38060__$1 = state_38060;
var statearr_38152_40508 = state_38060__$1;
(statearr_38152_40508[(2)] = inst_37920);

(statearr_38152_40508[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (22))){
var inst_37940 = (state_38060[(8)]);
var inst_37943 = cljs.core.async.close_BANG_(inst_37940);
var state_38060__$1 = state_38060;
var statearr_38156_40510 = state_38060__$1;
(statearr_38156_40510[(2)] = inst_37943);

(statearr_38156_40510[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (36))){
var inst_38004 = (state_38060[(23)]);
var inst_38014 = cljs.core.chunk_first(inst_38004);
var inst_38015 = cljs.core.chunk_rest(inst_38004);
var inst_38017 = cljs.core.count(inst_38014);
var inst_37971 = inst_38015;
var inst_37972 = inst_38014;
var inst_37973 = inst_38017;
var inst_37974 = (0);
var state_38060__$1 = (function (){var statearr_38168 = state_38060;
(statearr_38168[(19)] = inst_37971);

(statearr_38168[(11)] = inst_37974);

(statearr_38168[(20)] = inst_37973);

(statearr_38168[(12)] = inst_37972);

return statearr_38168;
})();
var statearr_38173_40513 = state_38060__$1;
(statearr_38173_40513[(2)] = null);

(statearr_38173_40513[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (41))){
var inst_38004 = (state_38060[(23)]);
var inst_38026 = (state_38060[(2)]);
var inst_38027 = cljs.core.next(inst_38004);
var inst_37971 = inst_38027;
var inst_37972 = null;
var inst_37973 = (0);
var inst_37974 = (0);
var state_38060__$1 = (function (){var statearr_38174 = state_38060;
(statearr_38174[(25)] = inst_38026);

(statearr_38174[(19)] = inst_37971);

(statearr_38174[(11)] = inst_37974);

(statearr_38174[(20)] = inst_37973);

(statearr_38174[(12)] = inst_37972);

return statearr_38174;
})();
var statearr_38178_40514 = state_38060__$1;
(statearr_38178_40514[(2)] = null);

(statearr_38178_40514[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (43))){
var state_38060__$1 = state_38060;
var statearr_38179_40515 = state_38060__$1;
(statearr_38179_40515[(2)] = null);

(statearr_38179_40515[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (29))){
var inst_38035 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38181_40517 = state_38060__$1;
(statearr_38181_40517[(2)] = inst_38035);

(statearr_38181_40517[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (44))){
var inst_38045 = (state_38060[(2)]);
var state_38060__$1 = (function (){var statearr_38186 = state_38060;
(statearr_38186[(26)] = inst_38045);

return statearr_38186;
})();
var statearr_38187_40519 = state_38060__$1;
(statearr_38187_40519[(2)] = null);

(statearr_38187_40519[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (6))){
var inst_37963 = (state_38060[(27)]);
var inst_37962 = cljs.core.deref(cs);
var inst_37963__$1 = cljs.core.keys(inst_37962);
var inst_37964 = cljs.core.count(inst_37963__$1);
var inst_37965 = cljs.core.reset_BANG_(dctr,inst_37964);
var inst_37970 = cljs.core.seq(inst_37963__$1);
var inst_37971 = inst_37970;
var inst_37972 = null;
var inst_37973 = (0);
var inst_37974 = (0);
var state_38060__$1 = (function (){var statearr_38196 = state_38060;
(statearr_38196[(28)] = inst_37965);

(statearr_38196[(27)] = inst_37963__$1);

(statearr_38196[(19)] = inst_37971);

(statearr_38196[(11)] = inst_37974);

(statearr_38196[(20)] = inst_37973);

(statearr_38196[(12)] = inst_37972);

return statearr_38196;
})();
var statearr_38199_40529 = state_38060__$1;
(statearr_38199_40529[(2)] = null);

(statearr_38199_40529[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (28))){
var inst_37971 = (state_38060[(19)]);
var inst_38004 = (state_38060[(23)]);
var inst_38004__$1 = cljs.core.seq(inst_37971);
var state_38060__$1 = (function (){var statearr_38200 = state_38060;
(statearr_38200[(23)] = inst_38004__$1);

return statearr_38200;
})();
if(inst_38004__$1){
var statearr_38201_40534 = state_38060__$1;
(statearr_38201_40534[(1)] = (33));

} else {
var statearr_38202_40535 = state_38060__$1;
(statearr_38202_40535[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (25))){
var inst_37974 = (state_38060[(11)]);
var inst_37973 = (state_38060[(20)]);
var inst_37976 = (inst_37974 < inst_37973);
var inst_37977 = inst_37976;
var state_38060__$1 = state_38060;
if(cljs.core.truth_(inst_37977)){
var statearr_38206_40540 = state_38060__$1;
(statearr_38206_40540[(1)] = (27));

} else {
var statearr_38207_40542 = state_38060__$1;
(statearr_38207_40542[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (34))){
var state_38060__$1 = state_38060;
var statearr_38208_40544 = state_38060__$1;
(statearr_38208_40544[(2)] = null);

(statearr_38208_40544[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (17))){
var state_38060__$1 = state_38060;
var statearr_38209_40545 = state_38060__$1;
(statearr_38209_40545[(2)] = null);

(statearr_38209_40545[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (3))){
var inst_38051 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38060__$1,inst_38051);
} else {
if((state_val_38061 === (12))){
var inst_37957 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38210_40547 = state_38060__$1;
(statearr_38210_40547[(2)] = inst_37957);

(statearr_38210_40547[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (2))){
var state_38060__$1 = state_38060;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38060__$1,(4),ch);
} else {
if((state_val_38061 === (23))){
var state_38060__$1 = state_38060;
var statearr_38216_40548 = state_38060__$1;
(statearr_38216_40548[(2)] = null);

(statearr_38216_40548[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (35))){
var inst_38033 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38224_40553 = state_38060__$1;
(statearr_38224_40553[(2)] = inst_38033);

(statearr_38224_40553[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (19))){
var inst_37927 = (state_38060[(7)]);
var inst_37931 = cljs.core.chunk_first(inst_37927);
var inst_37932 = cljs.core.chunk_rest(inst_37927);
var inst_37933 = cljs.core.count(inst_37931);
var inst_37892 = inst_37932;
var inst_37893 = inst_37931;
var inst_37894 = inst_37933;
var inst_37895 = (0);
var state_38060__$1 = (function (){var statearr_38225 = state_38060;
(statearr_38225[(13)] = inst_37892);

(statearr_38225[(14)] = inst_37894);

(statearr_38225[(15)] = inst_37895);

(statearr_38225[(16)] = inst_37893);

return statearr_38225;
})();
var statearr_38236_40554 = state_38060__$1;
(statearr_38236_40554[(2)] = null);

(statearr_38236_40554[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (11))){
var inst_37892 = (state_38060[(13)]);
var inst_37927 = (state_38060[(7)]);
var inst_37927__$1 = cljs.core.seq(inst_37892);
var state_38060__$1 = (function (){var statearr_38237 = state_38060;
(statearr_38237[(7)] = inst_37927__$1);

return statearr_38237;
})();
if(inst_37927__$1){
var statearr_38240_40555 = state_38060__$1;
(statearr_38240_40555[(1)] = (16));

} else {
var statearr_38242_40556 = state_38060__$1;
(statearr_38242_40556[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (9))){
var inst_37959 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38243_40557 = state_38060__$1;
(statearr_38243_40557[(2)] = inst_37959);

(statearr_38243_40557[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (5))){
var inst_37890 = cljs.core.deref(cs);
var inst_37891 = cljs.core.seq(inst_37890);
var inst_37892 = inst_37891;
var inst_37893 = null;
var inst_37894 = (0);
var inst_37895 = (0);
var state_38060__$1 = (function (){var statearr_38250 = state_38060;
(statearr_38250[(13)] = inst_37892);

(statearr_38250[(14)] = inst_37894);

(statearr_38250[(15)] = inst_37895);

(statearr_38250[(16)] = inst_37893);

return statearr_38250;
})();
var statearr_38258_40558 = state_38060__$1;
(statearr_38258_40558[(2)] = null);

(statearr_38258_40558[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (14))){
var state_38060__$1 = state_38060;
var statearr_38265_40559 = state_38060__$1;
(statearr_38265_40559[(2)] = null);

(statearr_38265_40559[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (45))){
var inst_38042 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38266_40560 = state_38060__$1;
(statearr_38266_40560[(2)] = inst_38042);

(statearr_38266_40560[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (26))){
var inst_37963 = (state_38060[(27)]);
var inst_38038 = (state_38060[(2)]);
var inst_38039 = cljs.core.seq(inst_37963);
var state_38060__$1 = (function (){var statearr_38278 = state_38060;
(statearr_38278[(29)] = inst_38038);

return statearr_38278;
})();
if(inst_38039){
var statearr_38283_40561 = state_38060__$1;
(statearr_38283_40561[(1)] = (42));

} else {
var statearr_38284_40562 = state_38060__$1;
(statearr_38284_40562[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (16))){
var inst_37927 = (state_38060[(7)]);
var inst_37929 = cljs.core.chunked_seq_QMARK_(inst_37927);
var state_38060__$1 = state_38060;
if(inst_37929){
var statearr_38287_40563 = state_38060__$1;
(statearr_38287_40563[(1)] = (19));

} else {
var statearr_38289_40564 = state_38060__$1;
(statearr_38289_40564[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (38))){
var inst_38030 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38303_40565 = state_38060__$1;
(statearr_38303_40565[(2)] = inst_38030);

(statearr_38303_40565[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (30))){
var state_38060__$1 = state_38060;
var statearr_38310_40566 = state_38060__$1;
(statearr_38310_40566[(2)] = null);

(statearr_38310_40566[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (10))){
var inst_37895 = (state_38060[(15)]);
var inst_37893 = (state_38060[(16)]);
var inst_37910 = cljs.core._nth(inst_37893,inst_37895);
var inst_37911 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_37910,(0),null);
var inst_37912 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_37910,(1),null);
var state_38060__$1 = (function (){var statearr_38316 = state_38060;
(statearr_38316[(24)] = inst_37911);

return statearr_38316;
})();
if(cljs.core.truth_(inst_37912)){
var statearr_38321_40567 = state_38060__$1;
(statearr_38321_40567[(1)] = (13));

} else {
var statearr_38322_40568 = state_38060__$1;
(statearr_38322_40568[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (18))){
var inst_37955 = (state_38060[(2)]);
var state_38060__$1 = state_38060;
var statearr_38323_40569 = state_38060__$1;
(statearr_38323_40569[(2)] = inst_37955);

(statearr_38323_40569[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (42))){
var state_38060__$1 = state_38060;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38060__$1,(45),dchan);
} else {
if((state_val_38061 === (37))){
var inst_37874 = (state_38060[(10)]);
var inst_38004 = (state_38060[(23)]);
var inst_38020 = (state_38060[(22)]);
var inst_38020__$1 = cljs.core.first(inst_38004);
var inst_38021 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_38020__$1,inst_37874,done);
var state_38060__$1 = (function (){var statearr_38324 = state_38060;
(statearr_38324[(22)] = inst_38020__$1);

return statearr_38324;
})();
if(cljs.core.truth_(inst_38021)){
var statearr_38325_40570 = state_38060__$1;
(statearr_38325_40570[(1)] = (39));

} else {
var statearr_38326_40571 = state_38060__$1;
(statearr_38326_40571[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38061 === (8))){
var inst_37894 = (state_38060[(14)]);
var inst_37895 = (state_38060[(15)]);
var inst_37903 = (inst_37895 < inst_37894);
var inst_37904 = inst_37903;
var state_38060__$1 = state_38060;
if(cljs.core.truth_(inst_37904)){
var statearr_38333_40572 = state_38060__$1;
(statearr_38333_40572[(1)] = (10));

} else {
var statearr_38334_40573 = state_38060__$1;
(statearr_38334_40573[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__35512__auto__ = null;
var cljs$core$async$mult_$_state_machine__35512__auto____0 = (function (){
var statearr_38338 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38338[(0)] = cljs$core$async$mult_$_state_machine__35512__auto__);

(statearr_38338[(1)] = (1));

return statearr_38338;
});
var cljs$core$async$mult_$_state_machine__35512__auto____1 = (function (state_38060){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_38060);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e38342){var ex__35515__auto__ = e38342;
var statearr_38343_40575 = state_38060;
(statearr_38343_40575[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_38060[(4)]))){
var statearr_38344_40576 = state_38060;
(statearr_38344_40576[(1)] = cljs.core.first((state_38060[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40577 = state_38060;
state_38060 = G__40577;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__35512__auto__ = function(state_38060){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__35512__auto____1.call(this,state_38060);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__35512__auto____0;
cljs$core$async$mult_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__35512__auto____1;
return cljs$core$async$mult_$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_38345 = f__36432__auto__();
(statearr_38345[(6)] = c__36431__auto___40457);

return statearr_38345;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__38350 = arguments.length;
switch (G__38350) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_40580 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_40580(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_40582 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_40582(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_40591 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_40591(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_40600 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_40600(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_40611 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_40611(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40612 = arguments.length;
var i__5770__auto___40613 = (0);
while(true){
if((i__5770__auto___40613 < len__5769__auto___40612)){
args__5775__auto__.push((arguments[i__5770__auto___40613]));

var G__40614 = (i__5770__auto___40613 + (1));
i__5770__auto___40613 = G__40614;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__38414){
var map__38415 = p__38414;
var map__38415__$1 = cljs.core.__destructure_map(map__38415);
var opts = map__38415__$1;
var statearr_38418_40615 = state;
(statearr_38418_40615[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_38420_40616 = state;
(statearr_38420_40616[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_38421_40617 = state;
(statearr_38421_40617[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq38406){
var G__38407 = cljs.core.first(seq38406);
var seq38406__$1 = cljs.core.next(seq38406);
var G__38408 = cljs.core.first(seq38406__$1);
var seq38406__$2 = cljs.core.next(seq38406__$1);
var G__38410 = cljs.core.first(seq38406__$2);
var seq38406__$3 = cljs.core.next(seq38406__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__38407,G__38408,G__38410,seq38406__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38438 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38439){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta38439 = meta38439;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38440,meta38439__$1){
var self__ = this;
var _38440__$1 = this;
return (new cljs.core.async.t_cljs$core$async38438(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta38439__$1));
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38440){
var self__ = this;
var _38440__$1 = this;
return self__.meta38439;
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38438.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38438.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta38439","meta38439",-645677727,null)], null);
}));

(cljs.core.async.t_cljs$core$async38438.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async38438.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38438");

(cljs.core.async.t_cljs$core$async38438.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async38438");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async38438.
 */
cljs.core.async.__GT_t_cljs$core$async38438 = (function cljs$core$async$__GT_t_cljs$core$async38438(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38439){
return (new cljs.core.async.t_cljs$core$async38438(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38439));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async38438(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__36431__auto___40642 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_38551){
var state_val_38552 = (state_38551[(1)]);
if((state_val_38552 === (7))){
var inst_38507 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
if(cljs.core.truth_(inst_38507)){
var statearr_38563_40643 = state_38551__$1;
(statearr_38563_40643[(1)] = (8));

} else {
var statearr_38564_40644 = state_38551__$1;
(statearr_38564_40644[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (20))){
var inst_38500 = (state_38551[(7)]);
var state_38551__$1 = state_38551;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38551__$1,(23),out,inst_38500);
} else {
if((state_val_38552 === (1))){
var inst_38477 = calc_state();
var inst_38478 = cljs.core.__destructure_map(inst_38477);
var inst_38479 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38478,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_38480 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38478,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_38482 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38478,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_38483 = inst_38477;
var state_38551__$1 = (function (){var statearr_38565 = state_38551;
(statearr_38565[(8)] = inst_38483);

(statearr_38565[(9)] = inst_38482);

(statearr_38565[(10)] = inst_38480);

(statearr_38565[(11)] = inst_38479);

return statearr_38565;
})();
var statearr_38566_40649 = state_38551__$1;
(statearr_38566_40649[(2)] = null);

(statearr_38566_40649[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (24))){
var inst_38489 = (state_38551[(12)]);
var inst_38483 = inst_38489;
var state_38551__$1 = (function (){var statearr_38567 = state_38551;
(statearr_38567[(8)] = inst_38483);

return statearr_38567;
})();
var statearr_38568_40653 = state_38551__$1;
(statearr_38568_40653[(2)] = null);

(statearr_38568_40653[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (4))){
var inst_38502 = (state_38551[(13)]);
var inst_38500 = (state_38551[(7)]);
var inst_38499 = (state_38551[(2)]);
var inst_38500__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38499,(0),null);
var inst_38501 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38499,(1),null);
var inst_38502__$1 = (inst_38500__$1 == null);
var state_38551__$1 = (function (){var statearr_38570 = state_38551;
(statearr_38570[(14)] = inst_38501);

(statearr_38570[(13)] = inst_38502__$1);

(statearr_38570[(7)] = inst_38500__$1);

return statearr_38570;
})();
if(cljs.core.truth_(inst_38502__$1)){
var statearr_38571_40654 = state_38551__$1;
(statearr_38571_40654[(1)] = (5));

} else {
var statearr_38572_40655 = state_38551__$1;
(statearr_38572_40655[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (15))){
var inst_38490 = (state_38551[(15)]);
var inst_38524 = (state_38551[(16)]);
var inst_38524__$1 = cljs.core.empty_QMARK_(inst_38490);
var state_38551__$1 = (function (){var statearr_38580 = state_38551;
(statearr_38580[(16)] = inst_38524__$1);

return statearr_38580;
})();
if(inst_38524__$1){
var statearr_38581_40656 = state_38551__$1;
(statearr_38581_40656[(1)] = (17));

} else {
var statearr_38582_40657 = state_38551__$1;
(statearr_38582_40657[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (21))){
var inst_38489 = (state_38551[(12)]);
var inst_38483 = inst_38489;
var state_38551__$1 = (function (){var statearr_38586 = state_38551;
(statearr_38586[(8)] = inst_38483);

return statearr_38586;
})();
var statearr_38587_40658 = state_38551__$1;
(statearr_38587_40658[(2)] = null);

(statearr_38587_40658[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (13))){
var inst_38514 = (state_38551[(2)]);
var inst_38515 = calc_state();
var inst_38483 = inst_38515;
var state_38551__$1 = (function (){var statearr_38591 = state_38551;
(statearr_38591[(8)] = inst_38483);

(statearr_38591[(17)] = inst_38514);

return statearr_38591;
})();
var statearr_38592_40659 = state_38551__$1;
(statearr_38592_40659[(2)] = null);

(statearr_38592_40659[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (22))){
var inst_38544 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
var statearr_38595_40660 = state_38551__$1;
(statearr_38595_40660[(2)] = inst_38544);

(statearr_38595_40660[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (6))){
var inst_38501 = (state_38551[(14)]);
var inst_38505 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_38501,change);
var state_38551__$1 = state_38551;
var statearr_38599_40661 = state_38551__$1;
(statearr_38599_40661[(2)] = inst_38505);

(statearr_38599_40661[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (25))){
var state_38551__$1 = state_38551;
var statearr_38600_40662 = state_38551__$1;
(statearr_38600_40662[(2)] = null);

(statearr_38600_40662[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (17))){
var inst_38501 = (state_38551[(14)]);
var inst_38491 = (state_38551[(18)]);
var inst_38526 = (inst_38491.cljs$core$IFn$_invoke$arity$1 ? inst_38491.cljs$core$IFn$_invoke$arity$1(inst_38501) : inst_38491.call(null,inst_38501));
var inst_38527 = cljs.core.not(inst_38526);
var state_38551__$1 = state_38551;
var statearr_38606_40663 = state_38551__$1;
(statearr_38606_40663[(2)] = inst_38527);

(statearr_38606_40663[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (3))){
var inst_38548 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38551__$1,inst_38548);
} else {
if((state_val_38552 === (12))){
var state_38551__$1 = state_38551;
var statearr_38608_40664 = state_38551__$1;
(statearr_38608_40664[(2)] = null);

(statearr_38608_40664[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (2))){
var inst_38483 = (state_38551[(8)]);
var inst_38489 = (state_38551[(12)]);
var inst_38489__$1 = cljs.core.__destructure_map(inst_38483);
var inst_38490 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38489__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_38491 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38489__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_38492 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38489__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_38551__$1 = (function (){var statearr_38609 = state_38551;
(statearr_38609[(12)] = inst_38489__$1);

(statearr_38609[(18)] = inst_38491);

(statearr_38609[(15)] = inst_38490);

return statearr_38609;
})();
return cljs.core.async.ioc_alts_BANG_(state_38551__$1,(4),inst_38492);
} else {
if((state_val_38552 === (23))){
var inst_38535 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
if(cljs.core.truth_(inst_38535)){
var statearr_38611_40670 = state_38551__$1;
(statearr_38611_40670[(1)] = (24));

} else {
var statearr_38613_40671 = state_38551__$1;
(statearr_38613_40671[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (19))){
var inst_38530 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
var statearr_38614_40672 = state_38551__$1;
(statearr_38614_40672[(2)] = inst_38530);

(statearr_38614_40672[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (11))){
var inst_38501 = (state_38551[(14)]);
var inst_38511 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_38501);
var state_38551__$1 = state_38551;
var statearr_38616_40673 = state_38551__$1;
(statearr_38616_40673[(2)] = inst_38511);

(statearr_38616_40673[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (9))){
var inst_38501 = (state_38551[(14)]);
var inst_38490 = (state_38551[(15)]);
var inst_38521 = (state_38551[(19)]);
var inst_38521__$1 = (inst_38490.cljs$core$IFn$_invoke$arity$1 ? inst_38490.cljs$core$IFn$_invoke$arity$1(inst_38501) : inst_38490.call(null,inst_38501));
var state_38551__$1 = (function (){var statearr_38618 = state_38551;
(statearr_38618[(19)] = inst_38521__$1);

return statearr_38618;
})();
if(cljs.core.truth_(inst_38521__$1)){
var statearr_38619_40677 = state_38551__$1;
(statearr_38619_40677[(1)] = (14));

} else {
var statearr_38620_40678 = state_38551__$1;
(statearr_38620_40678[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (5))){
var inst_38502 = (state_38551[(13)]);
var state_38551__$1 = state_38551;
var statearr_38621_40679 = state_38551__$1;
(statearr_38621_40679[(2)] = inst_38502);

(statearr_38621_40679[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (14))){
var inst_38521 = (state_38551[(19)]);
var state_38551__$1 = state_38551;
var statearr_38622_40680 = state_38551__$1;
(statearr_38622_40680[(2)] = inst_38521);

(statearr_38622_40680[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (26))){
var inst_38540 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
var statearr_38623_40682 = state_38551__$1;
(statearr_38623_40682[(2)] = inst_38540);

(statearr_38623_40682[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (16))){
var inst_38532 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
if(cljs.core.truth_(inst_38532)){
var statearr_38626_40684 = state_38551__$1;
(statearr_38626_40684[(1)] = (20));

} else {
var statearr_38630_40685 = state_38551__$1;
(statearr_38630_40685[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (10))){
var inst_38546 = (state_38551[(2)]);
var state_38551__$1 = state_38551;
var statearr_38631_40688 = state_38551__$1;
(statearr_38631_40688[(2)] = inst_38546);

(statearr_38631_40688[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (18))){
var inst_38524 = (state_38551[(16)]);
var state_38551__$1 = state_38551;
var statearr_38632_40689 = state_38551__$1;
(statearr_38632_40689[(2)] = inst_38524);

(statearr_38632_40689[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38552 === (8))){
var inst_38500 = (state_38551[(7)]);
var inst_38509 = (inst_38500 == null);
var state_38551__$1 = state_38551;
if(cljs.core.truth_(inst_38509)){
var statearr_38633_40690 = state_38551__$1;
(statearr_38633_40690[(1)] = (11));

} else {
var statearr_38634_40691 = state_38551__$1;
(statearr_38634_40691[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__35512__auto__ = null;
var cljs$core$async$mix_$_state_machine__35512__auto____0 = (function (){
var statearr_38644 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38644[(0)] = cljs$core$async$mix_$_state_machine__35512__auto__);

(statearr_38644[(1)] = (1));

return statearr_38644;
});
var cljs$core$async$mix_$_state_machine__35512__auto____1 = (function (state_38551){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_38551);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e38648){var ex__35515__auto__ = e38648;
var statearr_38649_40692 = state_38551;
(statearr_38649_40692[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_38551[(4)]))){
var statearr_38654_40693 = state_38551;
(statearr_38654_40693[(1)] = cljs.core.first((state_38551[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40694 = state_38551;
state_38551 = G__40694;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__35512__auto__ = function(state_38551){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__35512__auto____1.call(this,state_38551);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__35512__auto____0;
cljs$core$async$mix_$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__35512__auto____1;
return cljs$core$async$mix_$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_38665 = f__36432__auto__();
(statearr_38665[(6)] = c__36431__auto___40642);

return statearr_38665;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_40698 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_40698(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_40699 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_40699(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_40704 = (function() {
var G__40705 = null;
var G__40705__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__40705__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__40705 = function(p,v){
switch(arguments.length){
case 1:
return G__40705__1.call(this,p);
case 2:
return G__40705__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__40705.cljs$core$IFn$_invoke$arity$1 = G__40705__1;
G__40705.cljs$core$IFn$_invoke$arity$2 = G__40705__2;
return G__40705;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__38771 = arguments.length;
switch (G__38771) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_40704(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_40704(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38807 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta38808){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta38808 = meta38808;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38809,meta38808__$1){
var self__ = this;
var _38809__$1 = this;
return (new cljs.core.async.t_cljs$core$async38807(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta38808__$1));
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38809){
var self__ = this;
var _38809__$1 = this;
return self__.meta38808;
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async38807.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async38807.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta38808","meta38808",-797789798,null)], null);
}));

(cljs.core.async.t_cljs$core$async38807.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async38807.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38807");

(cljs.core.async.t_cljs$core$async38807.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async38807");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async38807.
 */
cljs.core.async.__GT_t_cljs$core$async38807 = (function cljs$core$async$__GT_t_cljs$core$async38807(ch,topic_fn,buf_fn,mults,ensure_mult,meta38808){
return (new cljs.core.async.t_cljs$core$async38807(ch,topic_fn,buf_fn,mults,ensure_mult,meta38808));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__38797 = arguments.length;
switch (G__38797) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__38794_SHARP_){
if(cljs.core.truth_((p1__38794_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__38794_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__38794_SHARP_.call(null,topic)))){
return p1__38794_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__38794_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async38807(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__36431__auto___40731 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_38905){
var state_val_38906 = (state_38905[(1)]);
if((state_val_38906 === (7))){
var inst_38901 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38910_40732 = state_38905__$1;
(statearr_38910_40732[(2)] = inst_38901);

(statearr_38910_40732[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (20))){
var state_38905__$1 = state_38905;
var statearr_38911_40733 = state_38905__$1;
(statearr_38911_40733[(2)] = null);

(statearr_38911_40733[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (1))){
var state_38905__$1 = state_38905;
var statearr_38912_40737 = state_38905__$1;
(statearr_38912_40737[(2)] = null);

(statearr_38912_40737[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (24))){
var inst_38884 = (state_38905[(7)]);
var inst_38893 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_38884);
var state_38905__$1 = state_38905;
var statearr_38913_40738 = state_38905__$1;
(statearr_38913_40738[(2)] = inst_38893);

(statearr_38913_40738[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (4))){
var inst_38835 = (state_38905[(8)]);
var inst_38835__$1 = (state_38905[(2)]);
var inst_38836 = (inst_38835__$1 == null);
var state_38905__$1 = (function (){var statearr_38914 = state_38905;
(statearr_38914[(8)] = inst_38835__$1);

return statearr_38914;
})();
if(cljs.core.truth_(inst_38836)){
var statearr_38916_40739 = state_38905__$1;
(statearr_38916_40739[(1)] = (5));

} else {
var statearr_38917_40740 = state_38905__$1;
(statearr_38917_40740[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (15))){
var inst_38878 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38918_40741 = state_38905__$1;
(statearr_38918_40741[(2)] = inst_38878);

(statearr_38918_40741[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (21))){
var inst_38898 = (state_38905[(2)]);
var state_38905__$1 = (function (){var statearr_38919 = state_38905;
(statearr_38919[(9)] = inst_38898);

return statearr_38919;
})();
var statearr_38920_40743 = state_38905__$1;
(statearr_38920_40743[(2)] = null);

(statearr_38920_40743[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (13))){
var inst_38860 = (state_38905[(10)]);
var inst_38862 = cljs.core.chunked_seq_QMARK_(inst_38860);
var state_38905__$1 = state_38905;
if(inst_38862){
var statearr_38921_40744 = state_38905__$1;
(statearr_38921_40744[(1)] = (16));

} else {
var statearr_38922_40745 = state_38905__$1;
(statearr_38922_40745[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (22))){
var inst_38890 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
if(cljs.core.truth_(inst_38890)){
var statearr_38923_40747 = state_38905__$1;
(statearr_38923_40747[(1)] = (23));

} else {
var statearr_38924_40748 = state_38905__$1;
(statearr_38924_40748[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (6))){
var inst_38835 = (state_38905[(8)]);
var inst_38886 = (state_38905[(11)]);
var inst_38884 = (state_38905[(7)]);
var inst_38884__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_38835) : topic_fn.call(null,inst_38835));
var inst_38885 = cljs.core.deref(mults);
var inst_38886__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38885,inst_38884__$1);
var state_38905__$1 = (function (){var statearr_38925 = state_38905;
(statearr_38925[(11)] = inst_38886__$1);

(statearr_38925[(7)] = inst_38884__$1);

return statearr_38925;
})();
if(cljs.core.truth_(inst_38886__$1)){
var statearr_38926_40752 = state_38905__$1;
(statearr_38926_40752[(1)] = (19));

} else {
var statearr_38927_40753 = state_38905__$1;
(statearr_38927_40753[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (25))){
var inst_38895 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38928_40754 = state_38905__$1;
(statearr_38928_40754[(2)] = inst_38895);

(statearr_38928_40754[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (17))){
var inst_38860 = (state_38905[(10)]);
var inst_38869 = cljs.core.first(inst_38860);
var inst_38870 = cljs.core.async.muxch_STAR_(inst_38869);
var inst_38871 = cljs.core.async.close_BANG_(inst_38870);
var inst_38872 = cljs.core.next(inst_38860);
var inst_38845 = inst_38872;
var inst_38846 = null;
var inst_38847 = (0);
var inst_38848 = (0);
var state_38905__$1 = (function (){var statearr_38933 = state_38905;
(statearr_38933[(12)] = inst_38847);

(statearr_38933[(13)] = inst_38846);

(statearr_38933[(14)] = inst_38848);

(statearr_38933[(15)] = inst_38871);

(statearr_38933[(16)] = inst_38845);

return statearr_38933;
})();
var statearr_38941_40755 = state_38905__$1;
(statearr_38941_40755[(2)] = null);

(statearr_38941_40755[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (3))){
var inst_38903 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38905__$1,inst_38903);
} else {
if((state_val_38906 === (12))){
var inst_38880 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38942_40757 = state_38905__$1;
(statearr_38942_40757[(2)] = inst_38880);

(statearr_38942_40757[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (2))){
var state_38905__$1 = state_38905;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38905__$1,(4),ch);
} else {
if((state_val_38906 === (23))){
var state_38905__$1 = state_38905;
var statearr_38943_40758 = state_38905__$1;
(statearr_38943_40758[(2)] = null);

(statearr_38943_40758[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (19))){
var inst_38835 = (state_38905[(8)]);
var inst_38886 = (state_38905[(11)]);
var inst_38888 = cljs.core.async.muxch_STAR_(inst_38886);
var state_38905__$1 = state_38905;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38905__$1,(22),inst_38888,inst_38835);
} else {
if((state_val_38906 === (11))){
var inst_38860 = (state_38905[(10)]);
var inst_38845 = (state_38905[(16)]);
var inst_38860__$1 = cljs.core.seq(inst_38845);
var state_38905__$1 = (function (){var statearr_38944 = state_38905;
(statearr_38944[(10)] = inst_38860__$1);

return statearr_38944;
})();
if(inst_38860__$1){
var statearr_38945_40759 = state_38905__$1;
(statearr_38945_40759[(1)] = (13));

} else {
var statearr_38946_40760 = state_38905__$1;
(statearr_38946_40760[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (9))){
var inst_38882 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38947_40762 = state_38905__$1;
(statearr_38947_40762[(2)] = inst_38882);

(statearr_38947_40762[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (5))){
var inst_38842 = cljs.core.deref(mults);
var inst_38843 = cljs.core.vals(inst_38842);
var inst_38844 = cljs.core.seq(inst_38843);
var inst_38845 = inst_38844;
var inst_38846 = null;
var inst_38847 = (0);
var inst_38848 = (0);
var state_38905__$1 = (function (){var statearr_38949 = state_38905;
(statearr_38949[(12)] = inst_38847);

(statearr_38949[(13)] = inst_38846);

(statearr_38949[(14)] = inst_38848);

(statearr_38949[(16)] = inst_38845);

return statearr_38949;
})();
var statearr_38951_40766 = state_38905__$1;
(statearr_38951_40766[(2)] = null);

(statearr_38951_40766[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (14))){
var state_38905__$1 = state_38905;
var statearr_38955_40768 = state_38905__$1;
(statearr_38955_40768[(2)] = null);

(statearr_38955_40768[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (16))){
var inst_38860 = (state_38905[(10)]);
var inst_38864 = cljs.core.chunk_first(inst_38860);
var inst_38865 = cljs.core.chunk_rest(inst_38860);
var inst_38866 = cljs.core.count(inst_38864);
var inst_38845 = inst_38865;
var inst_38846 = inst_38864;
var inst_38847 = inst_38866;
var inst_38848 = (0);
var state_38905__$1 = (function (){var statearr_38957 = state_38905;
(statearr_38957[(12)] = inst_38847);

(statearr_38957[(13)] = inst_38846);

(statearr_38957[(14)] = inst_38848);

(statearr_38957[(16)] = inst_38845);

return statearr_38957;
})();
var statearr_38958_40769 = state_38905__$1;
(statearr_38958_40769[(2)] = null);

(statearr_38958_40769[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (10))){
var inst_38847 = (state_38905[(12)]);
var inst_38846 = (state_38905[(13)]);
var inst_38848 = (state_38905[(14)]);
var inst_38845 = (state_38905[(16)]);
var inst_38854 = cljs.core._nth(inst_38846,inst_38848);
var inst_38855 = cljs.core.async.muxch_STAR_(inst_38854);
var inst_38856 = cljs.core.async.close_BANG_(inst_38855);
var inst_38857 = (inst_38848 + (1));
var tmp38952 = inst_38847;
var tmp38953 = inst_38846;
var tmp38954 = inst_38845;
var inst_38845__$1 = tmp38954;
var inst_38846__$1 = tmp38953;
var inst_38847__$1 = tmp38952;
var inst_38848__$1 = inst_38857;
var state_38905__$1 = (function (){var statearr_38963 = state_38905;
(statearr_38963[(12)] = inst_38847__$1);

(statearr_38963[(17)] = inst_38856);

(statearr_38963[(13)] = inst_38846__$1);

(statearr_38963[(14)] = inst_38848__$1);

(statearr_38963[(16)] = inst_38845__$1);

return statearr_38963;
})();
var statearr_38964_40770 = state_38905__$1;
(statearr_38964_40770[(2)] = null);

(statearr_38964_40770[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (18))){
var inst_38875 = (state_38905[(2)]);
var state_38905__$1 = state_38905;
var statearr_38965_40771 = state_38905__$1;
(statearr_38965_40771[(2)] = inst_38875);

(statearr_38965_40771[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38906 === (8))){
var inst_38847 = (state_38905[(12)]);
var inst_38848 = (state_38905[(14)]);
var inst_38851 = (inst_38848 < inst_38847);
var inst_38852 = inst_38851;
var state_38905__$1 = state_38905;
if(cljs.core.truth_(inst_38852)){
var statearr_38967_40773 = state_38905__$1;
(statearr_38967_40773[(1)] = (10));

} else {
var statearr_38968_40774 = state_38905__$1;
(statearr_38968_40774[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_38972 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38972[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_38972[(1)] = (1));

return statearr_38972;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_38905){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_38905);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e38977){var ex__35515__auto__ = e38977;
var statearr_38978_40775 = state_38905;
(statearr_38978_40775[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_38905[(4)]))){
var statearr_38979_40776 = state_38905;
(statearr_38979_40776[(1)] = cljs.core.first((state_38905[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40777 = state_38905;
state_38905 = G__40777;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_38905){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_38905);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_38983 = f__36432__auto__();
(statearr_38983[(6)] = c__36431__auto___40731);

return statearr_38983;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__38987 = arguments.length;
switch (G__38987) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__38996 = arguments.length;
switch (G__38996) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__39004 = arguments.length;
switch (G__39004) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__36431__auto___40781 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39060){
var state_val_39061 = (state_39060[(1)]);
if((state_val_39061 === (7))){
var state_39060__$1 = state_39060;
var statearr_39062_40782 = state_39060__$1;
(statearr_39062_40782[(2)] = null);

(statearr_39062_40782[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (1))){
var state_39060__$1 = state_39060;
var statearr_39063_40783 = state_39060__$1;
(statearr_39063_40783[(2)] = null);

(statearr_39063_40783[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (4))){
var inst_39015 = (state_39060[(7)]);
var inst_39016 = (state_39060[(8)]);
var inst_39021 = (inst_39016 < inst_39015);
var state_39060__$1 = state_39060;
if(cljs.core.truth_(inst_39021)){
var statearr_39066_40784 = state_39060__$1;
(statearr_39066_40784[(1)] = (6));

} else {
var statearr_39067_40785 = state_39060__$1;
(statearr_39067_40785[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (15))){
var inst_39044 = (state_39060[(9)]);
var inst_39051 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_39044);
var state_39060__$1 = state_39060;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39060__$1,(17),out,inst_39051);
} else {
if((state_val_39061 === (13))){
var inst_39044 = (state_39060[(9)]);
var inst_39044__$1 = (state_39060[(2)]);
var inst_39046 = cljs.core.some(cljs.core.nil_QMARK_,inst_39044__$1);
var state_39060__$1 = (function (){var statearr_39071 = state_39060;
(statearr_39071[(9)] = inst_39044__$1);

return statearr_39071;
})();
if(cljs.core.truth_(inst_39046)){
var statearr_39072_40786 = state_39060__$1;
(statearr_39072_40786[(1)] = (14));

} else {
var statearr_39073_40788 = state_39060__$1;
(statearr_39073_40788[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (6))){
var state_39060__$1 = state_39060;
var statearr_39074_40789 = state_39060__$1;
(statearr_39074_40789[(2)] = null);

(statearr_39074_40789[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (17))){
var inst_39053 = (state_39060[(2)]);
var state_39060__$1 = (function (){var statearr_39080 = state_39060;
(statearr_39080[(10)] = inst_39053);

return statearr_39080;
})();
var statearr_39082_40790 = state_39060__$1;
(statearr_39082_40790[(2)] = null);

(statearr_39082_40790[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (3))){
var inst_39058 = (state_39060[(2)]);
var state_39060__$1 = state_39060;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39060__$1,inst_39058);
} else {
if((state_val_39061 === (12))){
var _ = (function (){var statearr_39092 = state_39060;
(statearr_39092[(4)] = cljs.core.rest((state_39060[(4)])));

return statearr_39092;
})();
var state_39060__$1 = state_39060;
var ex39079 = (state_39060__$1[(2)]);
var statearr_39093_40791 = state_39060__$1;
(statearr_39093_40791[(5)] = ex39079);


if((ex39079 instanceof Object)){
var statearr_39100_40792 = state_39060__$1;
(statearr_39100_40792[(1)] = (11));

(statearr_39100_40792[(5)] = null);

} else {
throw ex39079;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (2))){
var inst_39013 = cljs.core.reset_BANG_(dctr,cnt);
var inst_39015 = cnt;
var inst_39016 = (0);
var state_39060__$1 = (function (){var statearr_39104 = state_39060;
(statearr_39104[(11)] = inst_39013);

(statearr_39104[(7)] = inst_39015);

(statearr_39104[(8)] = inst_39016);

return statearr_39104;
})();
var statearr_39105_40793 = state_39060__$1;
(statearr_39105_40793[(2)] = null);

(statearr_39105_40793[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (11))){
var inst_39023 = (state_39060[(2)]);
var inst_39024 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_39060__$1 = (function (){var statearr_39106 = state_39060;
(statearr_39106[(12)] = inst_39023);

return statearr_39106;
})();
var statearr_39107_40794 = state_39060__$1;
(statearr_39107_40794[(2)] = inst_39024);

(statearr_39107_40794[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (9))){
var inst_39016 = (state_39060[(8)]);
var _ = (function (){var statearr_39120 = state_39060;
(statearr_39120[(4)] = cljs.core.cons((12),(state_39060[(4)])));

return statearr_39120;
})();
var inst_39030 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_39016) : chs__$1.call(null,inst_39016));
var inst_39031 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_39016) : done.call(null,inst_39016));
var inst_39032 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_39030,inst_39031);
var ___$1 = (function (){var statearr_39121 = state_39060;
(statearr_39121[(4)] = cljs.core.rest((state_39060[(4)])));

return statearr_39121;
})();
var state_39060__$1 = state_39060;
var statearr_39122_40795 = state_39060__$1;
(statearr_39122_40795[(2)] = inst_39032);

(statearr_39122_40795[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (5))){
var inst_39042 = (state_39060[(2)]);
var state_39060__$1 = (function (){var statearr_39123 = state_39060;
(statearr_39123[(13)] = inst_39042);

return statearr_39123;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39060__$1,(13),dchan);
} else {
if((state_val_39061 === (14))){
var inst_39048 = cljs.core.async.close_BANG_(out);
var state_39060__$1 = state_39060;
var statearr_39125_40796 = state_39060__$1;
(statearr_39125_40796[(2)] = inst_39048);

(statearr_39125_40796[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (16))){
var inst_39056 = (state_39060[(2)]);
var state_39060__$1 = state_39060;
var statearr_39126_40797 = state_39060__$1;
(statearr_39126_40797[(2)] = inst_39056);

(statearr_39126_40797[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (10))){
var inst_39016 = (state_39060[(8)]);
var inst_39035 = (state_39060[(2)]);
var inst_39036 = (inst_39016 + (1));
var inst_39016__$1 = inst_39036;
var state_39060__$1 = (function (){var statearr_39127 = state_39060;
(statearr_39127[(14)] = inst_39035);

(statearr_39127[(8)] = inst_39016__$1);

return statearr_39127;
})();
var statearr_39129_40798 = state_39060__$1;
(statearr_39129_40798[(2)] = null);

(statearr_39129_40798[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39061 === (8))){
var inst_39040 = (state_39060[(2)]);
var state_39060__$1 = state_39060;
var statearr_39130_40799 = state_39060__$1;
(statearr_39130_40799[(2)] = inst_39040);

(statearr_39130_40799[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39131 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39131[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39131[(1)] = (1));

return statearr_39131;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39060){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39060);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39132){var ex__35515__auto__ = e39132;
var statearr_39133_40800 = state_39060;
(statearr_39133_40800[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39060[(4)]))){
var statearr_39134_40801 = state_39060;
(statearr_39134_40801[(1)] = cljs.core.first((state_39060[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40803 = state_39060;
state_39060 = G__40803;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39060){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39060);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39135 = f__36432__auto__();
(statearr_39135[(6)] = c__36431__auto___40781);

return statearr_39135;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__39138 = arguments.length;
switch (G__39138) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___40806 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39176){
var state_val_39177 = (state_39176[(1)]);
if((state_val_39177 === (7))){
var inst_39156 = (state_39176[(7)]);
var inst_39155 = (state_39176[(8)]);
var inst_39155__$1 = (state_39176[(2)]);
var inst_39156__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39155__$1,(0),null);
var inst_39157 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39155__$1,(1),null);
var inst_39158 = (inst_39156__$1 == null);
var state_39176__$1 = (function (){var statearr_39178 = state_39176;
(statearr_39178[(7)] = inst_39156__$1);

(statearr_39178[(9)] = inst_39157);

(statearr_39178[(8)] = inst_39155__$1);

return statearr_39178;
})();
if(cljs.core.truth_(inst_39158)){
var statearr_39180_40810 = state_39176__$1;
(statearr_39180_40810[(1)] = (8));

} else {
var statearr_39184_40811 = state_39176__$1;
(statearr_39184_40811[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (1))){
var inst_39145 = cljs.core.vec(chs);
var inst_39146 = inst_39145;
var state_39176__$1 = (function (){var statearr_39185 = state_39176;
(statearr_39185[(10)] = inst_39146);

return statearr_39185;
})();
var statearr_39192_40813 = state_39176__$1;
(statearr_39192_40813[(2)] = null);

(statearr_39192_40813[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (4))){
var inst_39146 = (state_39176[(10)]);
var state_39176__$1 = state_39176;
return cljs.core.async.ioc_alts_BANG_(state_39176__$1,(7),inst_39146);
} else {
if((state_val_39177 === (6))){
var inst_39172 = (state_39176[(2)]);
var state_39176__$1 = state_39176;
var statearr_39193_40814 = state_39176__$1;
(statearr_39193_40814[(2)] = inst_39172);

(statearr_39193_40814[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (3))){
var inst_39174 = (state_39176[(2)]);
var state_39176__$1 = state_39176;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39176__$1,inst_39174);
} else {
if((state_val_39177 === (2))){
var inst_39146 = (state_39176[(10)]);
var inst_39148 = cljs.core.count(inst_39146);
var inst_39149 = (inst_39148 > (0));
var state_39176__$1 = state_39176;
if(cljs.core.truth_(inst_39149)){
var statearr_39195_40815 = state_39176__$1;
(statearr_39195_40815[(1)] = (4));

} else {
var statearr_39196_40816 = state_39176__$1;
(statearr_39196_40816[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (11))){
var inst_39146 = (state_39176[(10)]);
var inst_39165 = (state_39176[(2)]);
var tmp39194 = inst_39146;
var inst_39146__$1 = tmp39194;
var state_39176__$1 = (function (){var statearr_39197 = state_39176;
(statearr_39197[(11)] = inst_39165);

(statearr_39197[(10)] = inst_39146__$1);

return statearr_39197;
})();
var statearr_39198_40817 = state_39176__$1;
(statearr_39198_40817[(2)] = null);

(statearr_39198_40817[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (9))){
var inst_39156 = (state_39176[(7)]);
var state_39176__$1 = state_39176;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39176__$1,(11),out,inst_39156);
} else {
if((state_val_39177 === (5))){
var inst_39170 = cljs.core.async.close_BANG_(out);
var state_39176__$1 = state_39176;
var statearr_39201_40818 = state_39176__$1;
(statearr_39201_40818[(2)] = inst_39170);

(statearr_39201_40818[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (10))){
var inst_39168 = (state_39176[(2)]);
var state_39176__$1 = state_39176;
var statearr_39203_40820 = state_39176__$1;
(statearr_39203_40820[(2)] = inst_39168);

(statearr_39203_40820[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39177 === (8))){
var inst_39156 = (state_39176[(7)]);
var inst_39157 = (state_39176[(9)]);
var inst_39146 = (state_39176[(10)]);
var inst_39155 = (state_39176[(8)]);
var inst_39160 = (function (){var cs = inst_39146;
var vec__39151 = inst_39155;
var v = inst_39156;
var c = inst_39157;
return (function (p1__39136_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__39136_SHARP_);
});
})();
var inst_39161 = cljs.core.filterv(inst_39160,inst_39146);
var inst_39146__$1 = inst_39161;
var state_39176__$1 = (function (){var statearr_39206 = state_39176;
(statearr_39206[(10)] = inst_39146__$1);

return statearr_39206;
})();
var statearr_39207_40821 = state_39176__$1;
(statearr_39207_40821[(2)] = null);

(statearr_39207_40821[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39212 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39212[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39212[(1)] = (1));

return statearr_39212;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39176){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39176);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39213){var ex__35515__auto__ = e39213;
var statearr_39214_40823 = state_39176;
(statearr_39214_40823[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39176[(4)]))){
var statearr_39215_40824 = state_39176;
(statearr_39215_40824[(1)] = cljs.core.first((state_39176[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40825 = state_39176;
state_39176 = G__40825;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39176){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39176);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39216 = f__36432__auto__();
(statearr_39216[(6)] = c__36431__auto___40806);

return statearr_39216;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__39219 = arguments.length;
switch (G__39219) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___40829 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39246){
var state_val_39251 = (state_39246[(1)]);
if((state_val_39251 === (7))){
var inst_39228 = (state_39246[(7)]);
var inst_39228__$1 = (state_39246[(2)]);
var inst_39229 = (inst_39228__$1 == null);
var inst_39230 = cljs.core.not(inst_39229);
var state_39246__$1 = (function (){var statearr_39262 = state_39246;
(statearr_39262[(7)] = inst_39228__$1);

return statearr_39262;
})();
if(inst_39230){
var statearr_39263_40830 = state_39246__$1;
(statearr_39263_40830[(1)] = (8));

} else {
var statearr_39264_40831 = state_39246__$1;
(statearr_39264_40831[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (1))){
var inst_39221 = (0);
var state_39246__$1 = (function (){var statearr_39265 = state_39246;
(statearr_39265[(8)] = inst_39221);

return statearr_39265;
})();
var statearr_39266_40832 = state_39246__$1;
(statearr_39266_40832[(2)] = null);

(statearr_39266_40832[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (4))){
var state_39246__$1 = state_39246;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39246__$1,(7),ch);
} else {
if((state_val_39251 === (6))){
var inst_39241 = (state_39246[(2)]);
var state_39246__$1 = state_39246;
var statearr_39267_40833 = state_39246__$1;
(statearr_39267_40833[(2)] = inst_39241);

(statearr_39267_40833[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (3))){
var inst_39243 = (state_39246[(2)]);
var inst_39244 = cljs.core.async.close_BANG_(out);
var state_39246__$1 = (function (){var statearr_39268 = state_39246;
(statearr_39268[(9)] = inst_39243);

return statearr_39268;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39246__$1,inst_39244);
} else {
if((state_val_39251 === (2))){
var inst_39221 = (state_39246[(8)]);
var inst_39223 = (inst_39221 < n);
var state_39246__$1 = state_39246;
if(cljs.core.truth_(inst_39223)){
var statearr_39269_40834 = state_39246__$1;
(statearr_39269_40834[(1)] = (4));

} else {
var statearr_39270_40835 = state_39246__$1;
(statearr_39270_40835[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (11))){
var inst_39221 = (state_39246[(8)]);
var inst_39233 = (state_39246[(2)]);
var inst_39234 = (inst_39221 + (1));
var inst_39221__$1 = inst_39234;
var state_39246__$1 = (function (){var statearr_39271 = state_39246;
(statearr_39271[(8)] = inst_39221__$1);

(statearr_39271[(10)] = inst_39233);

return statearr_39271;
})();
var statearr_39272_40836 = state_39246__$1;
(statearr_39272_40836[(2)] = null);

(statearr_39272_40836[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (9))){
var state_39246__$1 = state_39246;
var statearr_39274_40837 = state_39246__$1;
(statearr_39274_40837[(2)] = null);

(statearr_39274_40837[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (5))){
var state_39246__$1 = state_39246;
var statearr_39275_40838 = state_39246__$1;
(statearr_39275_40838[(2)] = null);

(statearr_39275_40838[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (10))){
var inst_39238 = (state_39246[(2)]);
var state_39246__$1 = state_39246;
var statearr_39276_40839 = state_39246__$1;
(statearr_39276_40839[(2)] = inst_39238);

(statearr_39276_40839[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39251 === (8))){
var inst_39228 = (state_39246[(7)]);
var state_39246__$1 = state_39246;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39246__$1,(11),out,inst_39228);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39277 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39277[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39277[(1)] = (1));

return statearr_39277;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39246){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39246);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39282){var ex__35515__auto__ = e39282;
var statearr_39283_40842 = state_39246;
(statearr_39283_40842[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39246[(4)]))){
var statearr_39284_40843 = state_39246;
(statearr_39284_40843[(1)] = cljs.core.first((state_39246[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40847 = state_39246;
state_39246 = G__40847;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39246){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39246);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39286 = f__36432__auto__();
(statearr_39286[(6)] = c__36431__auto___40829);

return statearr_39286;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39299 = (function (f,ch,meta39290,_,fn1,meta39300){
this.f = f;
this.ch = ch;
this.meta39290 = meta39290;
this._ = _;
this.fn1 = fn1;
this.meta39300 = meta39300;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39301,meta39300__$1){
var self__ = this;
var _39301__$1 = this;
return (new cljs.core.async.t_cljs$core$async39299(self__.f,self__.ch,self__.meta39290,self__._,self__.fn1,meta39300__$1));
}));

(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39301){
var self__ = this;
var _39301__$1 = this;
return self__.meta39300;
}));

(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39299.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__39288_SHARP_){
var G__39311 = (((p1__39288_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__39288_SHARP_) : self__.f.call(null,p1__39288_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__39311) : f1.call(null,G__39311));
});
}));

(cljs.core.async.t_cljs$core$async39299.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39290","meta39290",-1996807544,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async39289","cljs.core.async/t_cljs$core$async39289",-68066063,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta39300","meta39300",342529059,null)], null);
}));

(cljs.core.async.t_cljs$core$async39299.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39299.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39299");

(cljs.core.async.t_cljs$core$async39299.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39299");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39299.
 */
cljs.core.async.__GT_t_cljs$core$async39299 = (function cljs$core$async$__GT_t_cljs$core$async39299(f,ch,meta39290,_,fn1,meta39300){
return (new cljs.core.async.t_cljs$core$async39299(f,ch,meta39290,_,fn1,meta39300));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39289 = (function (f,ch,meta39290){
this.f = f;
this.ch = ch;
this.meta39290 = meta39290;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39291,meta39290__$1){
var self__ = this;
var _39291__$1 = this;
return (new cljs.core.async.t_cljs$core$async39289(self__.f,self__.ch,meta39290__$1));
}));

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39291){
var self__ = this;
var _39291__$1 = this;
return self__.meta39290;
}));

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async39299(self__.f,self__.ch,self__.meta39290,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__39321 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__39321) : self__.f.call(null,G__39321));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39289.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async39289.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39290","meta39290",-1996807544,null)], null);
}));

(cljs.core.async.t_cljs$core$async39289.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39289.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39289");

(cljs.core.async.t_cljs$core$async39289.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39289");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39289.
 */
cljs.core.async.__GT_t_cljs$core$async39289 = (function cljs$core$async$__GT_t_cljs$core$async39289(f,ch,meta39290){
return (new cljs.core.async.t_cljs$core$async39289(f,ch,meta39290));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async39289(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39336 = (function (f,ch,meta39337){
this.f = f;
this.ch = ch;
this.meta39337 = meta39337;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39338,meta39337__$1){
var self__ = this;
var _39338__$1 = this;
return (new cljs.core.async.t_cljs$core$async39336(self__.f,self__.ch,meta39337__$1));
}));

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39338){
var self__ = this;
var _39338__$1 = this;
return self__.meta39337;
}));

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39336.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async39336.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39337","meta39337",453675782,null)], null);
}));

(cljs.core.async.t_cljs$core$async39336.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39336.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39336");

(cljs.core.async.t_cljs$core$async39336.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39336");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39336.
 */
cljs.core.async.__GT_t_cljs$core$async39336 = (function cljs$core$async$__GT_t_cljs$core$async39336(f,ch,meta39337){
return (new cljs.core.async.t_cljs$core$async39336(f,ch,meta39337));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async39336(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39370 = (function (p,ch,meta39371){
this.p = p;
this.ch = ch;
this.meta39371 = meta39371;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39372,meta39371__$1){
var self__ = this;
var _39372__$1 = this;
return (new cljs.core.async.t_cljs$core$async39370(self__.p,self__.ch,meta39371__$1));
}));

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39372){
var self__ = this;
var _39372__$1 = this;
return self__.meta39371;
}));

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39370.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async39370.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39371","meta39371",168547549,null)], null);
}));

(cljs.core.async.t_cljs$core$async39370.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39370.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39370");

(cljs.core.async.t_cljs$core$async39370.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39370");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39370.
 */
cljs.core.async.__GT_t_cljs$core$async39370 = (function cljs$core$async$__GT_t_cljs$core$async39370(p,ch,meta39371){
return (new cljs.core.async.t_cljs$core$async39370(p,ch,meta39371));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async39370(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__39410 = arguments.length;
switch (G__39410) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___40871 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39475){
var state_val_39477 = (state_39475[(1)]);
if((state_val_39477 === (7))){
var inst_39466 = (state_39475[(2)]);
var state_39475__$1 = state_39475;
var statearr_39497_40872 = state_39475__$1;
(statearr_39497_40872[(2)] = inst_39466);

(statearr_39497_40872[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (1))){
var state_39475__$1 = state_39475;
var statearr_39501_40873 = state_39475__$1;
(statearr_39501_40873[(2)] = null);

(statearr_39501_40873[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (4))){
var inst_39444 = (state_39475[(7)]);
var inst_39444__$1 = (state_39475[(2)]);
var inst_39445 = (inst_39444__$1 == null);
var state_39475__$1 = (function (){var statearr_39506 = state_39475;
(statearr_39506[(7)] = inst_39444__$1);

return statearr_39506;
})();
if(cljs.core.truth_(inst_39445)){
var statearr_39510_40874 = state_39475__$1;
(statearr_39510_40874[(1)] = (5));

} else {
var statearr_39521_40875 = state_39475__$1;
(statearr_39521_40875[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (6))){
var inst_39444 = (state_39475[(7)]);
var inst_39449 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_39444) : p.call(null,inst_39444));
var state_39475__$1 = state_39475;
if(cljs.core.truth_(inst_39449)){
var statearr_39526_40876 = state_39475__$1;
(statearr_39526_40876[(1)] = (8));

} else {
var statearr_39535_40877 = state_39475__$1;
(statearr_39535_40877[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (3))){
var inst_39468 = (state_39475[(2)]);
var state_39475__$1 = state_39475;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39475__$1,inst_39468);
} else {
if((state_val_39477 === (2))){
var state_39475__$1 = state_39475;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39475__$1,(4),ch);
} else {
if((state_val_39477 === (11))){
var inst_39456 = (state_39475[(2)]);
var state_39475__$1 = state_39475;
var statearr_39540_40879 = state_39475__$1;
(statearr_39540_40879[(2)] = inst_39456);

(statearr_39540_40879[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (9))){
var state_39475__$1 = state_39475;
var statearr_39544_40880 = state_39475__$1;
(statearr_39544_40880[(2)] = null);

(statearr_39544_40880[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (5))){
var inst_39447 = cljs.core.async.close_BANG_(out);
var state_39475__$1 = state_39475;
var statearr_39545_40882 = state_39475__$1;
(statearr_39545_40882[(2)] = inst_39447);

(statearr_39545_40882[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (10))){
var inst_39459 = (state_39475[(2)]);
var state_39475__$1 = (function (){var statearr_39546 = state_39475;
(statearr_39546[(8)] = inst_39459);

return statearr_39546;
})();
var statearr_39547_40883 = state_39475__$1;
(statearr_39547_40883[(2)] = null);

(statearr_39547_40883[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39477 === (8))){
var inst_39444 = (state_39475[(7)]);
var state_39475__$1 = state_39475;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39475__$1,(11),out,inst_39444);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39549 = [null,null,null,null,null,null,null,null,null];
(statearr_39549[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39549[(1)] = (1));

return statearr_39549;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39475){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39475);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39551){var ex__35515__auto__ = e39551;
var statearr_39552_40884 = state_39475;
(statearr_39552_40884[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39475[(4)]))){
var statearr_39553_40885 = state_39475;
(statearr_39553_40885[(1)] = cljs.core.first((state_39475[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40886 = state_39475;
state_39475 = G__40886;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39475){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39475);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39555 = f__36432__auto__();
(statearr_39555[(6)] = c__36431__auto___40871);

return statearr_39555;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__39558 = arguments.length;
switch (G__39558) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__36431__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39636){
var state_val_39637 = (state_39636[(1)]);
if((state_val_39637 === (7))){
var inst_39632 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
var statearr_39642_40888 = state_39636__$1;
(statearr_39642_40888[(2)] = inst_39632);

(statearr_39642_40888[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (20))){
var inst_39602 = (state_39636[(7)]);
var inst_39613 = (state_39636[(2)]);
var inst_39614 = cljs.core.next(inst_39602);
var inst_39588 = inst_39614;
var inst_39589 = null;
var inst_39590 = (0);
var inst_39591 = (0);
var state_39636__$1 = (function (){var statearr_39643 = state_39636;
(statearr_39643[(8)] = inst_39589);

(statearr_39643[(9)] = inst_39588);

(statearr_39643[(10)] = inst_39591);

(statearr_39643[(11)] = inst_39590);

(statearr_39643[(12)] = inst_39613);

return statearr_39643;
})();
var statearr_39644_40889 = state_39636__$1;
(statearr_39644_40889[(2)] = null);

(statearr_39644_40889[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (1))){
var state_39636__$1 = state_39636;
var statearr_39650_40890 = state_39636__$1;
(statearr_39650_40890[(2)] = null);

(statearr_39650_40890[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (4))){
var inst_39576 = (state_39636[(13)]);
var inst_39576__$1 = (state_39636[(2)]);
var inst_39577 = (inst_39576__$1 == null);
var state_39636__$1 = (function (){var statearr_39652 = state_39636;
(statearr_39652[(13)] = inst_39576__$1);

return statearr_39652;
})();
if(cljs.core.truth_(inst_39577)){
var statearr_39653_40891 = state_39636__$1;
(statearr_39653_40891[(1)] = (5));

} else {
var statearr_39654_40892 = state_39636__$1;
(statearr_39654_40892[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (15))){
var state_39636__$1 = state_39636;
var statearr_39658_40893 = state_39636__$1;
(statearr_39658_40893[(2)] = null);

(statearr_39658_40893[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (21))){
var state_39636__$1 = state_39636;
var statearr_39660_40894 = state_39636__$1;
(statearr_39660_40894[(2)] = null);

(statearr_39660_40894[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (13))){
var inst_39589 = (state_39636[(8)]);
var inst_39588 = (state_39636[(9)]);
var inst_39591 = (state_39636[(10)]);
var inst_39590 = (state_39636[(11)]);
var inst_39598 = (state_39636[(2)]);
var inst_39599 = (inst_39591 + (1));
var tmp39655 = inst_39589;
var tmp39656 = inst_39588;
var tmp39657 = inst_39590;
var inst_39588__$1 = tmp39656;
var inst_39589__$1 = tmp39655;
var inst_39590__$1 = tmp39657;
var inst_39591__$1 = inst_39599;
var state_39636__$1 = (function (){var statearr_39664 = state_39636;
(statearr_39664[(8)] = inst_39589__$1);

(statearr_39664[(14)] = inst_39598);

(statearr_39664[(9)] = inst_39588__$1);

(statearr_39664[(10)] = inst_39591__$1);

(statearr_39664[(11)] = inst_39590__$1);

return statearr_39664;
})();
var statearr_39665_40896 = state_39636__$1;
(statearr_39665_40896[(2)] = null);

(statearr_39665_40896[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (22))){
var state_39636__$1 = state_39636;
var statearr_39666_40898 = state_39636__$1;
(statearr_39666_40898[(2)] = null);

(statearr_39666_40898[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (6))){
var inst_39576 = (state_39636[(13)]);
var inst_39586 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_39576) : f.call(null,inst_39576));
var inst_39587 = cljs.core.seq(inst_39586);
var inst_39588 = inst_39587;
var inst_39589 = null;
var inst_39590 = (0);
var inst_39591 = (0);
var state_39636__$1 = (function (){var statearr_39667 = state_39636;
(statearr_39667[(8)] = inst_39589);

(statearr_39667[(9)] = inst_39588);

(statearr_39667[(10)] = inst_39591);

(statearr_39667[(11)] = inst_39590);

return statearr_39667;
})();
var statearr_39669_40899 = state_39636__$1;
(statearr_39669_40899[(2)] = null);

(statearr_39669_40899[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (17))){
var inst_39602 = (state_39636[(7)]);
var inst_39606 = cljs.core.chunk_first(inst_39602);
var inst_39607 = cljs.core.chunk_rest(inst_39602);
var inst_39608 = cljs.core.count(inst_39606);
var inst_39588 = inst_39607;
var inst_39589 = inst_39606;
var inst_39590 = inst_39608;
var inst_39591 = (0);
var state_39636__$1 = (function (){var statearr_39681 = state_39636;
(statearr_39681[(8)] = inst_39589);

(statearr_39681[(9)] = inst_39588);

(statearr_39681[(10)] = inst_39591);

(statearr_39681[(11)] = inst_39590);

return statearr_39681;
})();
var statearr_39682_40906 = state_39636__$1;
(statearr_39682_40906[(2)] = null);

(statearr_39682_40906[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (3))){
var inst_39634 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39636__$1,inst_39634);
} else {
if((state_val_39637 === (12))){
var inst_39622 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
var statearr_39688_40907 = state_39636__$1;
(statearr_39688_40907[(2)] = inst_39622);

(statearr_39688_40907[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (2))){
var state_39636__$1 = state_39636;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39636__$1,(4),in$);
} else {
if((state_val_39637 === (23))){
var inst_39630 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
var statearr_39690_40908 = state_39636__$1;
(statearr_39690_40908[(2)] = inst_39630);

(statearr_39690_40908[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (19))){
var inst_39617 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
var statearr_39692_40909 = state_39636__$1;
(statearr_39692_40909[(2)] = inst_39617);

(statearr_39692_40909[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (11))){
var inst_39588 = (state_39636[(9)]);
var inst_39602 = (state_39636[(7)]);
var inst_39602__$1 = cljs.core.seq(inst_39588);
var state_39636__$1 = (function (){var statearr_39693 = state_39636;
(statearr_39693[(7)] = inst_39602__$1);

return statearr_39693;
})();
if(inst_39602__$1){
var statearr_39694_40910 = state_39636__$1;
(statearr_39694_40910[(1)] = (14));

} else {
var statearr_39695_40911 = state_39636__$1;
(statearr_39695_40911[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (9))){
var inst_39624 = (state_39636[(2)]);
var inst_39625 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_39636__$1 = (function (){var statearr_39696 = state_39636;
(statearr_39696[(15)] = inst_39624);

return statearr_39696;
})();
if(cljs.core.truth_(inst_39625)){
var statearr_39697_40912 = state_39636__$1;
(statearr_39697_40912[(1)] = (21));

} else {
var statearr_39698_40915 = state_39636__$1;
(statearr_39698_40915[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (5))){
var inst_39579 = cljs.core.async.close_BANG_(out);
var state_39636__$1 = state_39636;
var statearr_39702_40920 = state_39636__$1;
(statearr_39702_40920[(2)] = inst_39579);

(statearr_39702_40920[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (14))){
var inst_39602 = (state_39636[(7)]);
var inst_39604 = cljs.core.chunked_seq_QMARK_(inst_39602);
var state_39636__$1 = state_39636;
if(inst_39604){
var statearr_39704_40921 = state_39636__$1;
(statearr_39704_40921[(1)] = (17));

} else {
var statearr_39705_40922 = state_39636__$1;
(statearr_39705_40922[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (16))){
var inst_39620 = (state_39636[(2)]);
var state_39636__$1 = state_39636;
var statearr_39706_40923 = state_39636__$1;
(statearr_39706_40923[(2)] = inst_39620);

(statearr_39706_40923[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39637 === (10))){
var inst_39589 = (state_39636[(8)]);
var inst_39591 = (state_39636[(10)]);
var inst_39596 = cljs.core._nth(inst_39589,inst_39591);
var state_39636__$1 = state_39636;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39636__$1,(13),out,inst_39596);
} else {
if((state_val_39637 === (18))){
var inst_39602 = (state_39636[(7)]);
var inst_39611 = cljs.core.first(inst_39602);
var state_39636__$1 = state_39636;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39636__$1,(20),out,inst_39611);
} else {
if((state_val_39637 === (8))){
var inst_39591 = (state_39636[(10)]);
var inst_39590 = (state_39636[(11)]);
var inst_39593 = (inst_39591 < inst_39590);
var inst_39594 = inst_39593;
var state_39636__$1 = state_39636;
if(cljs.core.truth_(inst_39594)){
var statearr_39716_40924 = state_39636__$1;
(statearr_39716_40924[(1)] = (10));

} else {
var statearr_39717_40925 = state_39636__$1;
(statearr_39717_40925[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____0 = (function (){
var statearr_39718 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39718[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__);

(statearr_39718[(1)] = (1));

return statearr_39718;
});
var cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____1 = (function (state_39636){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39636);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39722){var ex__35515__auto__ = e39722;
var statearr_39723_40927 = state_39636;
(statearr_39723_40927[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39636[(4)]))){
var statearr_39724_40928 = state_39636;
(statearr_39724_40928[(1)] = cljs.core.first((state_39636[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40930 = state_39636;
state_39636 = G__40930;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__ = function(state_39636){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____1.call(this,state_39636);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__35512__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39725 = f__36432__auto__();
(statearr_39725[(6)] = c__36431__auto__);

return statearr_39725;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));

return c__36431__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__39734 = arguments.length;
switch (G__39734) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__39736 = arguments.length;
switch (G__39736) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__39749 = arguments.length;
switch (G__39749) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___40936 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39776){
var state_val_39777 = (state_39776[(1)]);
if((state_val_39777 === (7))){
var inst_39771 = (state_39776[(2)]);
var state_39776__$1 = state_39776;
var statearr_39782_40937 = state_39776__$1;
(statearr_39782_40937[(2)] = inst_39771);

(statearr_39782_40937[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (1))){
var inst_39752 = null;
var state_39776__$1 = (function (){var statearr_39783 = state_39776;
(statearr_39783[(7)] = inst_39752);

return statearr_39783;
})();
var statearr_39785_40938 = state_39776__$1;
(statearr_39785_40938[(2)] = null);

(statearr_39785_40938[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (4))){
var inst_39755 = (state_39776[(8)]);
var inst_39755__$1 = (state_39776[(2)]);
var inst_39756 = (inst_39755__$1 == null);
var inst_39757 = cljs.core.not(inst_39756);
var state_39776__$1 = (function (){var statearr_39786 = state_39776;
(statearr_39786[(8)] = inst_39755__$1);

return statearr_39786;
})();
if(inst_39757){
var statearr_39788_40939 = state_39776__$1;
(statearr_39788_40939[(1)] = (5));

} else {
var statearr_39793_40940 = state_39776__$1;
(statearr_39793_40940[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (6))){
var state_39776__$1 = state_39776;
var statearr_39798_40941 = state_39776__$1;
(statearr_39798_40941[(2)] = null);

(statearr_39798_40941[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (3))){
var inst_39773 = (state_39776[(2)]);
var inst_39774 = cljs.core.async.close_BANG_(out);
var state_39776__$1 = (function (){var statearr_39799 = state_39776;
(statearr_39799[(9)] = inst_39773);

return statearr_39799;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39776__$1,inst_39774);
} else {
if((state_val_39777 === (2))){
var state_39776__$1 = state_39776;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39776__$1,(4),ch);
} else {
if((state_val_39777 === (11))){
var inst_39755 = (state_39776[(8)]);
var inst_39765 = (state_39776[(2)]);
var inst_39752 = inst_39755;
var state_39776__$1 = (function (){var statearr_39806 = state_39776;
(statearr_39806[(7)] = inst_39752);

(statearr_39806[(10)] = inst_39765);

return statearr_39806;
})();
var statearr_39807_40943 = state_39776__$1;
(statearr_39807_40943[(2)] = null);

(statearr_39807_40943[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (9))){
var inst_39755 = (state_39776[(8)]);
var state_39776__$1 = state_39776;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39776__$1,(11),out,inst_39755);
} else {
if((state_val_39777 === (5))){
var inst_39752 = (state_39776[(7)]);
var inst_39755 = (state_39776[(8)]);
var inst_39759 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_39755,inst_39752);
var state_39776__$1 = state_39776;
if(inst_39759){
var statearr_39811_40955 = state_39776__$1;
(statearr_39811_40955[(1)] = (8));

} else {
var statearr_39812_40956 = state_39776__$1;
(statearr_39812_40956[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (10))){
var inst_39768 = (state_39776[(2)]);
var state_39776__$1 = state_39776;
var statearr_39814_40957 = state_39776__$1;
(statearr_39814_40957[(2)] = inst_39768);

(statearr_39814_40957[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39777 === (8))){
var inst_39752 = (state_39776[(7)]);
var tmp39808 = inst_39752;
var inst_39752__$1 = tmp39808;
var state_39776__$1 = (function (){var statearr_39821 = state_39776;
(statearr_39821[(7)] = inst_39752__$1);

return statearr_39821;
})();
var statearr_39822_40960 = state_39776__$1;
(statearr_39822_40960[(2)] = null);

(statearr_39822_40960[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39830 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39830[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39830[(1)] = (1));

return statearr_39830;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39776){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39776);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e39836){var ex__35515__auto__ = e39836;
var statearr_39837_40963 = state_39776;
(statearr_39837_40963[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39776[(4)]))){
var statearr_39838_40964 = state_39776;
(statearr_39838_40964[(1)] = cljs.core.first((state_39776[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40965 = state_39776;
state_39776 = G__40965;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39776){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39776);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_39843 = f__36432__auto__();
(statearr_39843[(6)] = c__36431__auto___40936);

return statearr_39843;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__39853 = arguments.length;
switch (G__39853) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___40967 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_39902){
var state_val_39903 = (state_39902[(1)]);
if((state_val_39903 === (7))){
var inst_39898 = (state_39902[(2)]);
var state_39902__$1 = state_39902;
var statearr_39904_40968 = state_39902__$1;
(statearr_39904_40968[(2)] = inst_39898);

(statearr_39904_40968[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (1))){
var inst_39861 = (new Array(n));
var inst_39862 = inst_39861;
var inst_39863 = (0);
var state_39902__$1 = (function (){var statearr_39905 = state_39902;
(statearr_39905[(7)] = inst_39863);

(statearr_39905[(8)] = inst_39862);

return statearr_39905;
})();
var statearr_39907_40969 = state_39902__$1;
(statearr_39907_40969[(2)] = null);

(statearr_39907_40969[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (4))){
var inst_39866 = (state_39902[(9)]);
var inst_39866__$1 = (state_39902[(2)]);
var inst_39867 = (inst_39866__$1 == null);
var inst_39868 = cljs.core.not(inst_39867);
var state_39902__$1 = (function (){var statearr_39908 = state_39902;
(statearr_39908[(9)] = inst_39866__$1);

return statearr_39908;
})();
if(inst_39868){
var statearr_39909_40970 = state_39902__$1;
(statearr_39909_40970[(1)] = (5));

} else {
var statearr_39910_40974 = state_39902__$1;
(statearr_39910_40974[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (15))){
var inst_39892 = (state_39902[(2)]);
var state_39902__$1 = state_39902;
var statearr_39918_40976 = state_39902__$1;
(statearr_39918_40976[(2)] = inst_39892);

(statearr_39918_40976[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (13))){
var state_39902__$1 = state_39902;
var statearr_39937_40980 = state_39902__$1;
(statearr_39937_40980[(2)] = null);

(statearr_39937_40980[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (6))){
var inst_39863 = (state_39902[(7)]);
var inst_39888 = (inst_39863 > (0));
var state_39902__$1 = state_39902;
if(cljs.core.truth_(inst_39888)){
var statearr_39939_40981 = state_39902__$1;
(statearr_39939_40981[(1)] = (12));

} else {
var statearr_39940_40982 = state_39902__$1;
(statearr_39940_40982[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (3))){
var inst_39900 = (state_39902[(2)]);
var state_39902__$1 = state_39902;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39902__$1,inst_39900);
} else {
if((state_val_39903 === (12))){
var inst_39862 = (state_39902[(8)]);
var inst_39890 = cljs.core.vec(inst_39862);
var state_39902__$1 = state_39902;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39902__$1,(15),out,inst_39890);
} else {
if((state_val_39903 === (2))){
var state_39902__$1 = state_39902;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39902__$1,(4),ch);
} else {
if((state_val_39903 === (11))){
var inst_39878 = (state_39902[(2)]);
var inst_39879 = (new Array(n));
var inst_39862 = inst_39879;
var inst_39863 = (0);
var state_39902__$1 = (function (){var statearr_39951 = state_39902;
(statearr_39951[(7)] = inst_39863);

(statearr_39951[(10)] = inst_39878);

(statearr_39951[(8)] = inst_39862);

return statearr_39951;
})();
var statearr_39952_40985 = state_39902__$1;
(statearr_39952_40985[(2)] = null);

(statearr_39952_40985[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (9))){
var inst_39862 = (state_39902[(8)]);
var inst_39876 = cljs.core.vec(inst_39862);
var state_39902__$1 = state_39902;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39902__$1,(11),out,inst_39876);
} else {
if((state_val_39903 === (5))){
var inst_39863 = (state_39902[(7)]);
var inst_39871 = (state_39902[(11)]);
var inst_39862 = (state_39902[(8)]);
var inst_39866 = (state_39902[(9)]);
var inst_39870 = (inst_39862[inst_39863] = inst_39866);
var inst_39871__$1 = (inst_39863 + (1));
var inst_39872 = (inst_39871__$1 < n);
var state_39902__$1 = (function (){var statearr_39965 = state_39902;
(statearr_39965[(11)] = inst_39871__$1);

(statearr_39965[(12)] = inst_39870);

return statearr_39965;
})();
if(cljs.core.truth_(inst_39872)){
var statearr_39972_40992 = state_39902__$1;
(statearr_39972_40992[(1)] = (8));

} else {
var statearr_39973_40993 = state_39902__$1;
(statearr_39973_40993[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (14))){
var inst_39895 = (state_39902[(2)]);
var inst_39896 = cljs.core.async.close_BANG_(out);
var state_39902__$1 = (function (){var statearr_39976 = state_39902;
(statearr_39976[(13)] = inst_39895);

return statearr_39976;
})();
var statearr_39981_40994 = state_39902__$1;
(statearr_39981_40994[(2)] = inst_39896);

(statearr_39981_40994[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (10))){
var inst_39882 = (state_39902[(2)]);
var state_39902__$1 = state_39902;
var statearr_39982_40998 = state_39902__$1;
(statearr_39982_40998[(2)] = inst_39882);

(statearr_39982_40998[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39903 === (8))){
var inst_39871 = (state_39902[(11)]);
var inst_39862 = (state_39902[(8)]);
var tmp39974 = inst_39862;
var inst_39862__$1 = tmp39974;
var inst_39863 = inst_39871;
var state_39902__$1 = (function (){var statearr_39986 = state_39902;
(statearr_39986[(7)] = inst_39863);

(statearr_39986[(8)] = inst_39862__$1);

return statearr_39986;
})();
var statearr_39988_41001 = state_39902__$1;
(statearr_39988_41001[(2)] = null);

(statearr_39988_41001[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_39998 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39998[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_39998[(1)] = (1));

return statearr_39998;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_39902){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_39902);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e40000){var ex__35515__auto__ = e40000;
var statearr_40002_41002 = state_39902;
(statearr_40002_41002[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_39902[(4)]))){
var statearr_40010_41003 = state_39902;
(statearr_40010_41003[(1)] = cljs.core.first((state_39902[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41004 = state_39902;
state_39902 = G__41004;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_39902){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_39902);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_40011 = f__36432__auto__();
(statearr_40011[(6)] = c__36431__auto___40967);

return statearr_40011;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__40020 = arguments.length;
switch (G__40020) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__36431__auto___41010 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__36432__auto__ = (function (){var switch__35511__auto__ = (function (state_40071){
var state_val_40072 = (state_40071[(1)]);
if((state_val_40072 === (7))){
var inst_40067 = (state_40071[(2)]);
var state_40071__$1 = state_40071;
var statearr_40078_41011 = state_40071__$1;
(statearr_40078_41011[(2)] = inst_40067);

(statearr_40078_41011[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (1))){
var inst_40022 = [];
var inst_40023 = inst_40022;
var inst_40024 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_40071__$1 = (function (){var statearr_40082 = state_40071;
(statearr_40082[(7)] = inst_40024);

(statearr_40082[(8)] = inst_40023);

return statearr_40082;
})();
var statearr_40083_41016 = state_40071__$1;
(statearr_40083_41016[(2)] = null);

(statearr_40083_41016[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (4))){
var inst_40027 = (state_40071[(9)]);
var inst_40027__$1 = (state_40071[(2)]);
var inst_40028 = (inst_40027__$1 == null);
var inst_40029 = cljs.core.not(inst_40028);
var state_40071__$1 = (function (){var statearr_40088 = state_40071;
(statearr_40088[(9)] = inst_40027__$1);

return statearr_40088;
})();
if(inst_40029){
var statearr_40089_41017 = state_40071__$1;
(statearr_40089_41017[(1)] = (5));

} else {
var statearr_40090_41018 = state_40071__$1;
(statearr_40090_41018[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (15))){
var inst_40023 = (state_40071[(8)]);
var inst_40059 = cljs.core.vec(inst_40023);
var state_40071__$1 = state_40071;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40071__$1,(18),out,inst_40059);
} else {
if((state_val_40072 === (13))){
var inst_40053 = (state_40071[(2)]);
var state_40071__$1 = state_40071;
var statearr_40091_41019 = state_40071__$1;
(statearr_40091_41019[(2)] = inst_40053);

(statearr_40091_41019[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (6))){
var inst_40023 = (state_40071[(8)]);
var inst_40056 = inst_40023.length;
var inst_40057 = (inst_40056 > (0));
var state_40071__$1 = state_40071;
if(cljs.core.truth_(inst_40057)){
var statearr_40095_41020 = state_40071__$1;
(statearr_40095_41020[(1)] = (15));

} else {
var statearr_40096_41021 = state_40071__$1;
(statearr_40096_41021[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (17))){
var inst_40064 = (state_40071[(2)]);
var inst_40065 = cljs.core.async.close_BANG_(out);
var state_40071__$1 = (function (){var statearr_40097 = state_40071;
(statearr_40097[(10)] = inst_40064);

return statearr_40097;
})();
var statearr_40101_41022 = state_40071__$1;
(statearr_40101_41022[(2)] = inst_40065);

(statearr_40101_41022[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (3))){
var inst_40069 = (state_40071[(2)]);
var state_40071__$1 = state_40071;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40071__$1,inst_40069);
} else {
if((state_val_40072 === (12))){
var inst_40023 = (state_40071[(8)]);
var inst_40046 = cljs.core.vec(inst_40023);
var state_40071__$1 = state_40071;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40071__$1,(14),out,inst_40046);
} else {
if((state_val_40072 === (2))){
var state_40071__$1 = state_40071;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40071__$1,(4),ch);
} else {
if((state_val_40072 === (11))){
var inst_40027 = (state_40071[(9)]);
var inst_40023 = (state_40071[(8)]);
var inst_40031 = (state_40071[(11)]);
var inst_40043 = inst_40023.push(inst_40027);
var tmp40102 = inst_40023;
var inst_40023__$1 = tmp40102;
var inst_40024 = inst_40031;
var state_40071__$1 = (function (){var statearr_40107 = state_40071;
(statearr_40107[(7)] = inst_40024);

(statearr_40107[(8)] = inst_40023__$1);

(statearr_40107[(12)] = inst_40043);

return statearr_40107;
})();
var statearr_40108_41025 = state_40071__$1;
(statearr_40108_41025[(2)] = null);

(statearr_40108_41025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (9))){
var inst_40024 = (state_40071[(7)]);
var inst_40039 = cljs.core.keyword_identical_QMARK_(inst_40024,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_40071__$1 = state_40071;
var statearr_40109_41026 = state_40071__$1;
(statearr_40109_41026[(2)] = inst_40039);

(statearr_40109_41026[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (5))){
var inst_40027 = (state_40071[(9)]);
var inst_40024 = (state_40071[(7)]);
var inst_40031 = (state_40071[(11)]);
var inst_40036 = (state_40071[(13)]);
var inst_40031__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_40027) : f.call(null,inst_40027));
var inst_40036__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40031__$1,inst_40024);
var state_40071__$1 = (function (){var statearr_40110 = state_40071;
(statearr_40110[(11)] = inst_40031__$1);

(statearr_40110[(13)] = inst_40036__$1);

return statearr_40110;
})();
if(inst_40036__$1){
var statearr_40111_41027 = state_40071__$1;
(statearr_40111_41027[(1)] = (8));

} else {
var statearr_40112_41028 = state_40071__$1;
(statearr_40112_41028[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (14))){
var inst_40027 = (state_40071[(9)]);
var inst_40031 = (state_40071[(11)]);
var inst_40048 = (state_40071[(2)]);
var inst_40049 = [];
var inst_40050 = inst_40049.push(inst_40027);
var inst_40023 = inst_40049;
var inst_40024 = inst_40031;
var state_40071__$1 = (function (){var statearr_40113 = state_40071;
(statearr_40113[(7)] = inst_40024);

(statearr_40113[(14)] = inst_40048);

(statearr_40113[(8)] = inst_40023);

(statearr_40113[(15)] = inst_40050);

return statearr_40113;
})();
var statearr_40114_41033 = state_40071__$1;
(statearr_40114_41033[(2)] = null);

(statearr_40114_41033[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (16))){
var state_40071__$1 = state_40071;
var statearr_40116_41034 = state_40071__$1;
(statearr_40116_41034[(2)] = null);

(statearr_40116_41034[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (10))){
var inst_40041 = (state_40071[(2)]);
var state_40071__$1 = state_40071;
if(cljs.core.truth_(inst_40041)){
var statearr_40117_41035 = state_40071__$1;
(statearr_40117_41035[(1)] = (11));

} else {
var statearr_40118_41036 = state_40071__$1;
(statearr_40118_41036[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (18))){
var inst_40061 = (state_40071[(2)]);
var state_40071__$1 = state_40071;
var statearr_40123_41037 = state_40071__$1;
(statearr_40123_41037[(2)] = inst_40061);

(statearr_40123_41037[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40072 === (8))){
var inst_40036 = (state_40071[(13)]);
var state_40071__$1 = state_40071;
var statearr_40124_41039 = state_40071__$1;
(statearr_40124_41039[(2)] = inst_40036);

(statearr_40124_41039[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__35512__auto__ = null;
var cljs$core$async$state_machine__35512__auto____0 = (function (){
var statearr_40125 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40125[(0)] = cljs$core$async$state_machine__35512__auto__);

(statearr_40125[(1)] = (1));

return statearr_40125;
});
var cljs$core$async$state_machine__35512__auto____1 = (function (state_40071){
while(true){
var ret_value__35513__auto__ = (function (){try{while(true){
var result__35514__auto__ = switch__35511__auto__(state_40071);
if(cljs.core.keyword_identical_QMARK_(result__35514__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__35514__auto__;
}
break;
}
}catch (e40126){var ex__35515__auto__ = e40126;
var statearr_40127_41041 = state_40071;
(statearr_40127_41041[(2)] = ex__35515__auto__);


if(cljs.core.seq((state_40071[(4)]))){
var statearr_40131_41042 = state_40071;
(statearr_40131_41042[(1)] = cljs.core.first((state_40071[(4)])));

} else {
throw ex__35515__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35513__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41043 = state_40071;
state_40071 = G__41043;
continue;
} else {
return ret_value__35513__auto__;
}
break;
}
});
cljs$core$async$state_machine__35512__auto__ = function(state_40071){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__35512__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__35512__auto____1.call(this,state_40071);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__35512__auto____0;
cljs$core$async$state_machine__35512__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__35512__auto____1;
return cljs$core$async$state_machine__35512__auto__;
})()
})();
var state__36433__auto__ = (function (){var statearr_40136 = f__36432__auto__();
(statearr_40136[(6)] = c__36431__auto___41010);

return statearr_40136;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36433__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
