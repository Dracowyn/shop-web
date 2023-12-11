<template>
    <div>
        收货列表
        <ul>
            <li>
                <router-link :to="{ name: 'AddressEdit', params: { id: 1 } }">收货地址1</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/business/address/edit', query: { id: 2 } }">收货地址2</router-link>
            </li>
        </ul>
    </div>
</template>
\ No newline at 