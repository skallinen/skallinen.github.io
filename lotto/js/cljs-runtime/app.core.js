goog.provide('app.core');
var module$node_modules$bitcoin_address_generator$index=shadow.js.require("module$node_modules$bitcoin_address_generator$index", {});
var module$node_modules$react_dom$client=shadow.js.require("module$node_modules$react_dom$client", {});
app.core.gen_address = (function app$core$gen_address(){
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
module$node_modules$bitcoin_address_generator$index.createWalletAddress((function (p1__49825_SHARP_){
return cljs.core.reset_BANG_(result,p1__49825_SHARP_);
}));

return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(result),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
});
cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(app.core.gen_address()),"12ib7dApVFvg82TXKycWBNpN8kFyiAN1dr");
app.core.reset_component = (function app$core$reset_component(seconds){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"value","value",305978217),"Reset",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(seconds,(60));
})], null)], null);
});

app.core.app = (function (){var G__49827 = (function app$core$app_render(props__34848__auto__,maybe_ref__34849__auto__){
var vec__49828 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [helix.core.extract_cljs_props(props__34848__auto__),maybe_ref__34849__auto__], null);

var vec__49831 = helix.hooks.use_state(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),false,new cljs.core.Keyword(null,"display","display",242065432),true,new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),app.core.gen_address(),new cljs.core.Keyword(null,"display","display",242065432),false], null)], null));
var state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49831,(0),null);
var set_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49831,(1),null);
return helix.core.get_react().createElement("div",(function (){var obj49835 = ({"style":(function (){var obj49837 = ({"display":helix.impl.props.__GT_js("grid"),"gridTemplateColumns":helix.impl.props.__GT_js("10% 80% 10%")});
return obj49837;
})(),"className":"pb-10"});
return obj49835;
})(),helix.core.get_react().createElement("p",(function (){var obj49839 = ({"style":(function (){var obj49841 = ({"gridColumn":helix.impl.props.__GT_js("2"),"fontSize":helix.impl.props.__GT_js("6vh")});
return obj49841;
})(),"className":"text-center"});
return obj49839;
})(),"Is Today Your Lucky Day?"),helix.core.get_react().createElement("p",(function (){var obj49843 = ({"style":(function (){var obj49845 = ({"gridColumn":helix.impl.props.__GT_js("2"),"fontSize":helix.impl.props.__GT_js("4vh")});
return obj49845;
})(),"className":"text-6xl py-16 text-center"});
return obj49843;
})(),"1/2+ Billion Dollar Lottery (Free)!"),helix.core.get_react().createElement("p",(function (){var obj49847 = ({"style":(function (){var obj49849 = ({"gridColumn":helix.impl.props.__GT_js("2")});
return obj49849;
})(),"className":"pb-16"});
return obj49847;
})(),"Wallet 967 has been inactive since July 25th, 2010, and holds a balance of 31,000 BTC, more than half a billion dollars. It's likely that the owner of this early wallet has lost access information, like many others. By clicking the button below, we'll generate a random key for the account. The chances of it being the right one are incredibly slim, at one in 2^256, but who knows, maybe today's your lucky day! Give it a shot and find out:"),helix.core.get_react().createElement("button",(function (){var obj49851 = ({"style":(function (){var obj49853 = ({"gridColumn":helix.impl.props.__GT_js("2"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj49853;
})(),"className":"bg-blue-500 hover:bg-orange-700 text-white font-bold p-2 rounded-full","onClick":(function (){
var G__49854 = cljs.core.assoc;
var G__49855 = new cljs.core.Keyword(null,"display","display",242065432);
var G__49856 = cljs.core.not(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state));
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__49854,G__49855,G__49856) : set_state.call(null,G__49854,G__49855,G__49856));
}),"onMouseOver":(function (){
var G__49857 = cljs.core.assoc_in;
var G__49858 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__49859 = true;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__49857,G__49858,G__49859) : set_state.call(null,G__49857,G__49858,G__49859));
}),"onMouseOut":(function (){
var G__49860 = cljs.core.assoc_in;
var G__49861 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current","current",-1088038603),new cljs.core.Keyword(null,"display","display",242065432)], null);
var G__49862 = false;
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(G__49860,G__49861,G__49862) : set_state.call(null,G__49860,G__49861,G__49862));
})});
return obj49851;
})(),"Are you feeling lucky?"),helix.core.get_react().createElement("div",(function (){var obj49864 = ({"style":(function (){var obj49866 = ({"gridColumn":helix.impl.props.__GT_js("2"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(state))?"none":"block")),"className":helix.impl.props.__GT_js("text-center")});
return obj49866;
})()});
return obj49864;
})(),helix.core.get_react().createElement("button",(function (){var obj49868 = ({"style":(function (){var obj49870 = ({"fontSize":helix.impl.props.__GT_js("4vw")});
return obj49870;
})(),"className":"text-center p10","onClick":(function (){
return (set_state.cljs$core$IFn$_invoke$arity$3 ? set_state.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true) : set_state.call(null,cljs.core.assoc,new cljs.core.Keyword(null,"display-win?","display-win?",-867263381),true));
})});
return obj49868;
})(),new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))),helix.core.get_react().createElement("p",(function (){var obj49872 = ({"className":"text-center","style":(function (){var obj49874 = ({"gridColumn":helix.impl.props.__GT_js("2"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"none":"block"))});
return obj49874;
})()});
return obj49872;
})(),"Klick on the key \u261D cento find out if you won!")),helix.core.get_react().createElement("div",(function (){var obj49876 = ({"style":(function (){var obj49878 = ({"gridColumn":helix.impl.props.__GT_js("2"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display-win?","display-win?",-867263381).cljs$core$IFn$_invoke$arity$1(state))?"block":"none"))});
return obj49878;
})(),"className":"text-center text-4xl p10"});
return obj49876;
})(),(cljs.core.truth_((function (){var G__49880 = new cljs.core.Keyword(null,"address","address",559499426).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)));
var fexpr__49879 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["12ib7dApVFvg82TXKycWBNpN8kFyiAN1dr",null], null), null);
return (fexpr__49879.cljs$core$IFn$_invoke$arity$1 ? fexpr__49879.cljs$core$IFn$_invoke$arity$1(G__49880) : fexpr__49879.call(null,G__49880));
})())?helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj49882 = ({"className":"border-3 text-green-500 pt-10"});
return obj49882;
})(),"WOOOOOOOO! Fucking hell! You won it! Take note of your private key:"),helix.core.get_react().createElement("p",(function (){var obj49884 = ({"className":"text-sm p-10"});
return obj49884;
})(),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state))))):helix.core.get_react().createElement("div",null,helix.core.get_react().createElement("p",(function (){var obj49886 = ({"className":"pt-10 text-blue-500"});
return obj49886;
})(),"Nope! Sorry, not today..."),helix.core.get_react().createElement("p",(function (){var obj49888 = ({"className":"text-base"});
return obj49888;
})(),"Try again tomorrow..")))),helix.core.get_react().createElement("img",(function (){var obj49890 = ({"src":"https://media3.giphy.com/media/GhU3C9uMON5X8OLx2G/giphy.gif?cid=ecf05e47nlyjmfa9s1ljn8hxw418dmq4jik7uoku8575fexu&rid=giphy.gif&ct=g","style":(function (){var obj49892 = ({"gridColumn":helix.impl.props.__GT_js("2"),"display":helix.impl.props.__GT_js((cljs.core.truth_(new cljs.core.Keyword(null,"display","display",242065432).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(state)))?"block":"none"))});
return obj49892;
})(),"className":"place-self-center pt-8","width":"150"});
return obj49890;
})()));
});
if(goog.DEBUG === true){
var G__49893 = G__49827;
(G__49893.displayName = "app.core/app");

return G__49893;
} else {
return G__49827;
}
})();



app.core.init = (function app$core$init(){
var root = module$node_modules$react_dom$client.createRoot(document.getElementById("app"));
return root.render(helix.core.get_react().createElement(app.core.app,null));
});

//# sourceMappingURL=app.core.js.map
