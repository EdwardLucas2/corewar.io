﻿/// <reference path="../references.ts" />

"use strict";

class TestLoader {

    public getWarriors(path: string, names: string[]): P.Promise<ITestWarrior[]> {
        var result = P.defer<ITestWarrior[]>();

        var files: { [filename: string]: string } = {};
        
        var filenames = _(names).map((name) => {
            return path + name + ".red";
        }).concat(_(names).map((name) => {
            return path + name + ".ld";
        }));

        var fileCount = filenames.length;

        _(filenames).forEach((filename) => {
            ajax.get(filename, undefined, (file) => {

                files[filename] = file;
                
                if (--fileCount === 0) {

                    this.return(result, path, names, files);
                }
            });
        });

        return result.promise();
    }

    private return(result: P.Deferred<ITestWarrior[]>, path: string, names: string[], files: { [filename: string]: string }) {

        var warriors: ITestWarrior[] = [];

        _(names).forEach((name) => {

            warriors.push({
                name: name,
                redcode: files[path + name + ".red"],
                loadfile: files[path + name + ".ld"]
            });
        });

        result.resolve(warriors);
    }
}