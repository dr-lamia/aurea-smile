def compute_tooth_setup(landmarks):
    # Call Exocad Connect API or ShapeJS to compute STL proposal.
    # This is a stub — in production, integrate with 3D engine.
    stl_path = "/tmp/dummy_tooth_setup.stl"
    summary = {"midline": landmarks[0], "tooth_count": 6}
    # Simulate STL file generation
    with open(stl_path, "wb") as f:
        f.write(b"solid toothsetup...\nendsolid toothsetup")
    return stl_path, summary