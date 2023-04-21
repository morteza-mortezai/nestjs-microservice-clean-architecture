import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class HttpClientService {
    private readonly _baseUrl = null
    constructor(
        private readonly fetchApi: fetch, baseUrl: string
    ) {
        this._baseUrl = baseUrl
    }
    async getById(url: string, id: number) {
        const response = await fetch(`${this._baseUrl}/url/${id}`, { method: 'GET', body: 'a=1' });
        const data = await response.json();
        return data
    }
    async post(url: string, id: number) {
        const response = await fetch(`${this._baseUrl}/url/${id}`, { method: 'POST', body: 'a=1' });
        const data = await response.json();
        return data
    }
    put() { }
    delete() { }
}