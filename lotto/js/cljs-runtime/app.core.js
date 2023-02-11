goog.provide('app.core');
var module$node_modules$bitcoin_address_generator$index=shadow.js.require("module$node_modules$bitcoin_address_generator$index", {});
var module$node_modules$react_dom$client=shadow.js.require("module$node_modules$react_dom$client", {});
app.core.gen_address = (function app$core$gen_address(){
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
module$node_modules$bitcoin_address_generator$index.createWalletAddress((function (p1__43228_SHARP_){
return cljs.core.reset_BANG_(result,p1__43228_SHARP_);
}));

return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(result),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
});
app.core.reset_component = (function app$core$reset_component(seconds){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Reset",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(seconds,(60));
})], null)], null);
});

app.core.app = (function (){var G__43230 = (function app$core$app_render(props__34477__auto__,maybe_ref__34478__auto__){
var vec__43231 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [helix.core.extract_cljs_props(props__34477__auto__),maybe_ref__34478__auto__], null);

var vec__43234 = helix.hooks.use_state(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),false,new cljs.core.Keyword(null,"display","display",242065432),true,new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),app.core.gen_address(),new cljs.core.Keyword(null,"display","display",242065432),false], null)], null));
var state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43234,(0),null);
var set_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43234,(1),null);
return helix.core.get_react().createElement("div",(function (){var obj43238 = ({"className":"mx-5 sm:mx-10 md:mx-16 lg:mx-20 xl:mx-64 .max-w-lg grid"});
return obj43238;
})(),helix.core.get_react().createElement("p",(function (){var obj43240 = ({"style":(function (){var obj43242 = ({"fontSize":helix.impl.props.__GT_js("max(min(2vw, 24px), 8px)")});
return obj43242;
})(),"className":"pt-10 text-center lg:lg"});
return obj43240;
})(),"IRRATIONAL HOPE"),helix.core.get_react().createElement("p",(function (){var obj43244 = ({"style":(function (){var obj43246 = ({"fontSize":helix.impl.props.__GT_js("max(min(12vw, 144px), 18px)")});
return obj43246;
})(),"className":"text-center"});
return obj43244;
})(),"Is Today Your Lucky Day?"),helix.core.get_react().createElement("p",(function (){var obj43248 = ({"style":(function (){var obj43250 = ({"fontSize":helix.impl.props.__GT_js("max(min(6vw, 72px), 9px)")});
return obj43250;
})(),"className":"text-6xl py-16 text-center"});
return obj43248;
})(),"1/2+ Billion Dollar Lottery (Free)!"),helix.core.get_react().createElement("p",(function (){var obj43252 = ({"className":"pb-16 text-xl lg:text-2xl xl:text-4xl"});
return obj43252;
})(),["Wallet 967 has been inactive since July 25th, 2010, and holds ","a balance of 31,000 BTC, more than half a billion dollars. It's ","likely that the owner of this early wallet has lost the access ","information, like many others. By clicking the button below, ","we'll generate a random key for the account. The chances of it ","being the right one are incredibly slim, at one in 2^256, but ","who knows, maybe today's your lucky day! Give it a shot and ","find out:"].join('')),helix.core.get_react().createElement("button",(function (){var obj43254 = ({"style":(function (){var obj43256 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj43256;
})(),"className":"bg-blue-500 hover:bg-orange-700 text-white font-bold p-2 rounded-full","onClick":(function (){
var G__43257 = cljs.core.assoc;
var G__43258 = new cljs.core.Keyword(null,"display","display",242065432);
var G__43259 = cljs.core.not(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state));
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__43257,G__43258,G__43259) : set_state.call(null,G__43257,G__43258,G__43259));
}),"onMouseOver":(function (){
var G__43260 = cljs.core.assoc_in;
var G__43261 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__43262 = true;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__43260,G__43261,G__43262) : set_state.call(null,G__43260,G__43261,G__43262));
}),"onMouseOut":(function (){
var G__43263 = cljs.core.assoc_in;
var G__43264 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__43265 = false;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__43263,G__43264,G__43265) : set_state.call(null,G__43263,G__43264,G__43265));
})});
return obj43254;
})(),"Are you feeling lucky?"),helix.core.get_react().createElement("div",(function (){var obj43267 = ({"style":(function (){var obj43269 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"none":"grid")),"className":helix.impl.props.__GT_js("text-center")});
return obj43269;
})()});
return obj43267;
})(),helix.core.get_react().createElement("button",(function (){var obj43271 = ({"style":(function (){var obj43273 = ({"fontSize":helix.impl.props.__GT_js("4vw")});
return obj43273;
})(),"className":"text-center p10 block","onClick":(function (){
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true) : set_state.call(null,cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true));
})});
return obj43271;
})(),new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))),helix.core.get_react().createElement("p",(function (){var obj43275 = ({"className":"text-center","style":(function (){var obj43277 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"none":"block"))});
return obj43277;
})()});
return obj43275;
})(),"Click on the key \u261D to find out if you won!")),helix.core.get_react().createElement("div",(function (){var obj43279 = ({"style":(function (){var obj43281 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj43281;
})(),"className":"text-center text-4xl p10"});
return obj43279;
})(),(cljs.core.truth_((function (){var G__43283 = new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)));
var fexpr__43282 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["12ib7dApVFvg82TXKycWBNpN8kFyiAN1dr",null], null), null);
return (fexpr__43282.cljs$core$IFn$_invoke$arity$1 ? fexpr__43282.cljs$core$IFn$_invoke$arity$1(G__43283) : fexpr__43282.call(null,G__43283));
})())?helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj43285 = ({"className":"border-3 text-green-500 pt-10"});
return obj43285;
})(),"WOOOOOOOO! Fucking hell! You won it! Take note of your private key:"),helix.core.get_react().createElement("p",(function (){var obj43287 = ({"className":"text-sm p-10"});
return obj43287;
})(),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state))))):helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj43289 = ({"className":"pt-10 text-blue-500"});
return obj43289;
})(),"Nope! Sorry, not today..."),helix.core.get_react().createElement("p",(function (){var obj43291 = ({"className":"text-base"});
return obj43291;
})(),"Try again tomorrow...")))),helix.core.get_react().createElement("img",(function (){var obj43293 = ({"src":cljs.core.rand_nth(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["https://media3.giphy.com/media/GhU3C9uMON5X8OLx2G/giphy.gif?cid=ecf05e47nlyjmfa9s1ljn8hxw418dmq4jik7uoku8575fexu&rid=giphy.gif&ct=g","https://media2.giphy.com/media/1AHZBEKJx5Mf57NQqb/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/30VBSGB7QW1RJpNcHO/giphy.gif?cid=ecf05e47j9pmfgook4yf3cdztme3eake5fxo3tpf8x60cdb7&rid=giphy.gif&ct=g","https://media0.giphy.com/media/287U9qQH5vrKg7KYSH/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g","https://media0.giphy.com/media/CayH3P0wRYbjPudd3J/giphy.gif?cid=ecf05e471h2jyvklk295f15umw86g1atvvymxeztii830oo4&rid=giphy.gif&ct=g","https://media3.giphy.com/media/uqPDIEPMODKne/giphy.gif?cid=ecf05e47t9woh5p3i50y2r3z5o07xf6iepzfodluqeamybuk&rid=giphy.gif&ct=g"], null)),"style":(function (){var obj43295 = ({"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))?"block":"none"))});
return obj43295;
})(),"className":"place-self-center pt-8","width":"150"});
return obj43293;
})()));
});
if(goog.DEBUG === true){
var G__43296 = G__43230;
(G__43296.displayName = "app.core/app");

return G__43296;
} else {
return G__43230;
}
})();



app.core.init = (function app$core$init(){
var root = module$node_modules$react_dom$client.createRoot(document.getElementById("app"));
return root.render(helix.core.get_react().createElement(app.core.app,null));
});

//# sourceMappingURL=app.core.js.map
