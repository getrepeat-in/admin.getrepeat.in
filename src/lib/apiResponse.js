import { NextResponse } from 'next/server';

export function successResponse(data, messageOrStatus, statusOverride = 200) {
    const isStatus = typeof messageOrStatus === 'number';
    const status = isStatus ? messageOrStatus : statusOverride;
    const message = typeof messageOrStatus === 'string' ? messageOrStatus : 'Success';

    return NextResponse.json({ success: true, message, data }, { status });
}

export function errorResponse(message, status = 500, error = null) {
    if (error) {
        console.error('API Error:', error);

        if (error.name === 'ValidationError') {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'A record with this unique identifier already exists.' }, { status: 409 });
        }
    } else {
        console.error(`API Error [${status}]:`, message);
    }

    return NextResponse.json({ success: false, error: message }, { status });
}
