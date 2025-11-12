/**
 * RightPanel Component
 * Displays the static bridge cross-section with zoom/pan support
 */

import React from "react";
import bridgeCrossSection from "../assets/Bridge_Section.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const RightPanel = () => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white sticky top-0 z-10">
        <h2 className="text-xl font-semibold text-gray-800">Visual Reference</h2>
        <p className="text-sm text-gray-600 mt-1">Bridge Configuration</p>
      </div>

      {/* Zoomable Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
          <TransformWrapper
            initialScale={1}
            minScale={0.8}
            maxScale={5}
            centerOnInit={true}
            wheel={{ step: 0.2 }}
            pinch={{ step: 0.2 }}
            doubleClick={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Controls */}
                <div className="flex justify-center gap-2 mb-2">
                  <button
                    onClick={() => zoomIn()}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    −
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  >
                    Reset
                  </button>
                </div>

                {/* Zoomable Image */}
                <TransformComponent
                  wrapperClass="max-w-[90vw] max-h-[70vh] flex items-center justify-center"
                  contentClass="flex items-center justify-center"
                >
                  <img
                    src={bridgeCrossSection}
                    alt="Bridge Cross Section"
                    className="rounded-md border border-gray-300 shadow-md object-contain max-h-[65vh]"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Reference diagram showing Carriageway Width, Girders, and Overhangs.
            (Use mouse wheel, pinch, or buttons to zoom)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
