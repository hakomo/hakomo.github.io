[1mdiff --git a/mm/index.html b/mm/index.html[m
[1mindex f367d41..aff6606 100644[m
[1m--- a/mm/index.html[m
[1m+++ b/mm/index.html[m
[36m@@ -44,6 +44,57 @@[m
 <script src='https://cdn.plot.ly/plotly-latest.min.js'></script>[m
 <script>[m
 var contests = [[m
[32m+[m[32m    {   name: 'topcoder TCO18MMR2 CrystalLighting',[m
[32m+[m[32m        outer_url: 'https://community.topcoder.com/longcontest/?module=ViewProblemStatement&compid=64279&rd=17179',[m
[32m+[m[32m        data_url: 'data/topcoderTCO18MMR2CrystalLighting.json',[m
[32m+[m[32m        url_get_parameter_and_title: 'CrystalLighting',[m
[32m+[m[32m        large_score_is_better: true,[m
[32m+[m[32m        users_filter: [1, 2, 3, 4],[m
[32m+[m[32m        invalid_score: -1e6,[m
[32m+[m[32m        parameters: [[m
[32m+[m[32m            {   name: 'H * W',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return h * w[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Probability of a crystal',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return pc[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Probability of an obstacle',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return po[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Lantern cost',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return lc[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Mirror cost',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return mc[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Obstacle cost',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return oc[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Max mirrors',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return mm[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m            {   name: 'Max obstacles',[m
[32m+[m[32m                get: function(h, w, pc, po, lc, mc, oc, mm, mo) {[m
[32m+[m[32m                    return mo[m
[32m+[m[32m                },[m
[32m+[m[32m            },[m
[32m+[m[32m        ],[m
[32m+[m[32m    },[m
[32m+[m
     {   name: 'topcoder MM100 SameColorPairs',[m
         outer_url: 'https://community.topcoder.com/longcontest/?module=ViewProblemStatement&compid=62857&rd=17143',[m
         data_url: 'data/topcoderMM100SameColorPairs.json',[m
[36m@@ -133,7 +184,7 @@[m [mvar contests = [[m
                 get: function(s, p, m, k) {[m
                     return k[m
                 },[m
[31m-            },            [m
[32m+[m[32m            },[m
             {   name: 'Best score',[m
                 get: function() {[m
                     return arguments[arguments.length - 1][m
[36m@@ -539,7 +590,7 @@[m [mfunction init() {[m
             }[m
         }[m
         test_case.push(best)[m
[31m-        if (contest.url_get_parameter_and_title === 'AbstractWars' || contest.url_get_parameter_and_title === 'ConnectedComponent' || contest.url_get_parameter_and_title === 'KnightsAttacks' || contest.url_get_parameter_and_title === 'CirclesMix' || contest.url_get_parameter_and_title === 'PointsOnTheCircle' || contest.url_get_parameter_and_title === 'PrincessesAndMonsters' || contest.url_get_parameter_and_title === 'SameColorPairs') {[m
[32m+[m[32m        if (contest.url_get_parameter_and_title === 'AbstractWars' || contest.url_get_parameter_and_title === 'ConnectedComponent' || contest.url_get_parameter_and_title === 'KnightsAttacks' || contest.url_get_parameter_and_title === 'CirclesMix' || contest.url_get_parameter_and_title === 'PointsOnTheCircle' || contest.url_get_parameter_and_title === 'PrincessesAndMonsters' || contest.url_get_parameter_and_title === 'SameColorPairs' || contest.url_get_parameter_and_title === 'CrystalLighting') {[m
             var scores = [][m
             for (var j = 0; j < users.length; ++j) {[m
                 var score = 0[m
