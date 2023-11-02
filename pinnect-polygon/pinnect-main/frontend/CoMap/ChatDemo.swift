//
//  ChatDemo.swift
//  CoMap
//
//  Created by Race Li on 2023/10/29.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.navigationDelegate = context.coordinator
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        // Update the view if needed
    }
    
    // Add a Coordinator to handle navigation events
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, WKNavigationDelegate {
        var parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        // This method is called when a navigation event occurs
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            // Zoom the webpage to 125%
            let script = """
                document.body.style.zoom = '125%';
            """
            webView.evaluateJavaScript(script)
        }
    }
}

struct ChatDemo: View {
    var body: some View {
        GeometryReader { geometry in
            WebView(url: URL(string: "https://vrch.ai/chat?u=magipop")!)
                .frame(height: geometry.size.height + 400)
                .edgesIgnoringSafeArea(.all)
        }
    }
}

#Preview {
    ChatDemo()
}
