// Package witness Code generated by go-bindata. (@generated) DO NOT EDIT.
// sources:
// ../node_modules/@kosu/system-contracts/src/deployedAddresses.json
package witness

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func bindataRead(data []byte, name string) ([]byte, error) {
	gz, err := gzip.NewReader(bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("read %q: %v", name, err)
	}

	var buf bytes.Buffer
	_, err = io.Copy(&buf, gz)
	clErr := gz.Close()

	if err != nil {
		return nil, fmt.Errorf("read %q: %v", name, err)
	}
	if clErr != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

type asset struct {
	bytes []byte
	info  os.FileInfo
}

type bindataFileInfo struct {
	name    string
	size    int64
	mode    os.FileMode
	modTime time.Time
}

// Name return file name
func (fi bindataFileInfo) Name() string {
	return fi.name
}

// Size return file size
func (fi bindataFileInfo) Size() int64 {
	return fi.size
}

// Mode return file mode
func (fi bindataFileInfo) Mode() os.FileMode {
	return fi.mode
}

// Mode return file modify time
func (fi bindataFileInfo) ModTime() time.Time {
	return fi.modTime
}

// IsDir return file whether a directory
func (fi bindataFileInfo) IsDir() bool {
	return fi.mode&os.ModeDir != 0
}

// Sys return file is sys mode
func (fi bindataFileInfo) Sys() interface{} {
	return nil
}

var _Node_modulesKosuSystemContractsSrcDeployedaddressesJson = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\x8c\x93\x3f\x6f\xa4\x45\x0c\x87\xfb\x7c\x8a\xd5\xd6\x14\xfe\x37\xb6\xe7\xba\x13\x8a\x28\x28\x38\xc1\xe9\x0a\xba\x19\x8f\x7d\x44\x40\x56\x7a\xf7\x0d\x04\xd0\x7d\x77\x94\xdb\x20\x72\x48\x21\xe9\x66\x0a\x3f\xb2\xfd\x7b\xfc\xd7\xd5\xe1\x70\x38\x1c\xf9\xf8\xe6\x70\x79\x7e\xfe\x7e\xb7\xad\xdc\xbe\x19\x7b\xfe\x3e\xfe\x38\xbe\x39\x1c\xe1\x1e\xc1\x8c\x02\x9a\x49\xc7\x45\x85\x58\x9a\x8b\x27\xa2\x2e\x5b\xc1\x11\x8e\xdc\x92\xe4\xf8\xd5\xbf\x94\xb7\x77\xfb\x4f\xa7\xed\xe6\xcf\x5c\x6f\xd7\xda\xf2\x7c\xce\xf3\x05\x66\xc6\x05\x6e\x94\x0e\xbc\xca\x67\x2a\x70\x0f\xe5\x61\xb6\x1a\x01\x51\x07\x9d\x0b\xf4\x29\xec\xfa\xb7\xbc\xdd\xaf\x7f\xbd\xd9\xf7\xdc\x2e\x94\x0e\x23\xaa\xd4\xa6\x33\x8d\x5a\xb5\xac\xb3\x0f\x98\x81\xd8\x69\x05\x78\x69\x98\x50\x3e\xa5\x7c\x7b\x3a\xdf\xbd\x3f\xfd\x9c\xb7\x17\x84\x03\x94\x22\x0d\x6e\xd5\x82\x32\x7d\x25\x69\x55\xef\xce\x31\x4d\xe6\xd0\xe8\xd4\xc7\x17\x53\xbd\xdf\x72\x9c\xef\xb6\xc7\xbd\x94\xb1\x19\x36\x0b\x74\x8c\x21\xad\x8b\x74\x12\x11\x89\xf0\x0c\x71\x26\x52\xa0\x15\x4f\x09\x1f\x4e\xfb\xcd\xed\xc7\x4b\x7d\xc0\x1c\x38\xa6\x9b\x63\x10\x4b\xc8\x04\x01\xc5\x39\x55\x10\xd5\x41\x90\x22\x68\xac\xa7\xf5\xef\x4e\xe7\x3d\xb7\xef\xf3\xe3\xcd\x79\xff\xa7\x8f\x20\x5c\x73\x66\x39\x57\x2d\x28\x0e\x66\x1b\xaa\xaa\x61\xaa\x5c\x9e\x38\xcd\xac\xfb\xf3\x9c\x77\xdb\xe9\xfe\x11\xe6\xd1\x1c\x73\x35\xb0\x61\xe1\xc2\x40\x1a\x05\x12\x83\x90\x9b\xd0\x34\x1b\x32\xb8\xdb\x17\x43\x8d\x5f\x6e\xd6\xd8\x4f\xff\xe9\xab\xca\x64\xad\x61\x0a\xde\x24\x58\x1f\x72\x2e\x23\x1f\x43\xd0\xfa\xf4\x09\x00\xc5\x44\xc7\xcf\xa4\x4f\x17\xe0\x51\xd1\xe4\x25\x23\xa7\xd7\x1a\xca\x82\xe5\x10\x73\x64\x77\x1b\xb3\xc5\x02\x58\x91\x0d\x08\xba\x25\x63\xa3\x57\x19\x99\x62\x8c\xd0\x63\x0a\xc6\x83\x9d\x8b\x2a\x01\xd3\x39\x34\x1b\x72\xd3\xea\xcd\xdb\x7a\xc1\x48\x2a\x1e\x95\x55\xd0\x51\x8a\xd9\xb4\xc7\xaa\x59\x5c\x51\x6e\x10\xcc\x93\x34\x18\xf1\x7f\x8c\x8c\x70\x75\x06\x5d\x8a\xee\x93\x26\x92\xb5\x87\x14\xb8\x93\x82\xd0\x94\xc5\x21\x49\xfd\x79\x23\x45\x9b\x51\x75\x70\x5a\x8b\x84\x7a\x50\x20\x7b\x8d\x2e\xce\x43\x6d\x49\x51\x5f\x42\xfc\x9c\x91\x6d\x29\x44\xe7\xe5\x53\x5c\x9d\x62\xb1\x5b\xf8\x4c\xcb\x2e\x8a\x53\x2d\xa3\x66\x0e\x7c\xc9\x48\x4b\x6d\x2c\xd3\x09\x9a\x21\x93\x68\x76\x1c\x28\x53\x94\x16\xad\x19\x23\x38\x57\xa2\xbd\xca\x48\x06\x9c\x13\xc0\x8b\x86\x0f\x8e\x91\xbd\xa3\x9b\x70\xa5\xb0\x90\xb7\x86\xdc\xc9\x8c\x5f\x61\x24\x90\xb6\xb4\x85\x13\xba\x98\x5b\x4c\x64\x34\x49\xf4\x81\x91\x15\x82\x64\xfd\xe1\xee\x9f\xa2\x7e\xcc\xed\x74\x7d\xff\x81\x7e\xb8\x9b\x5f\x9f\x6e\xf7\x6d\xc4\xfe\xb8\xac\xd6\x7b\xcf\x6a\xd9\x27\x55\x57\x6e\x8a\xda\x99\x08\x5a\x8f\x00\x1f\x39\x07\xf8\xd0\x7a\xd4\xfb\xea\xd3\xd5\xdf\x01\x00\x00\xff\xff\x99\xae\xfe\xd7\x71\x05\x00\x00")

func Node_modulesKosuSystemContractsSrcDeployedaddressesJsonBytes() ([]byte, error) {
	return bindataRead(
		_Node_modulesKosuSystemContractsSrcDeployedaddressesJson,
		"../node_modules/@kosu/system-contracts/src/deployedAddresses.json",
	)
}

func Node_modulesKosuSystemContractsSrcDeployedaddressesJson() (*asset, error) {
	bytes, err := Node_modulesKosuSystemContractsSrcDeployedaddressesJsonBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "../node_modules/@kosu/system-contracts/src/deployedAddresses.json", size: 1393, mode: os.FileMode(420), modTime: time.Unix(1562071495, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("Asset %s can't read by error: %v", name, err)
		}
		return a.bytes, nil
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// MustAsset is like Asset but panics when Asset would return an error.
// It simplifies safe initialization of global variables.
func MustAsset(name string) []byte {
	a, err := Asset(name)
	if err != nil {
		panic("asset: Asset(" + name + "): " + err.Error())
	}

	return a
}

// AssetInfo loads and returns the asset info for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func AssetInfo(name string) (os.FileInfo, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("AssetInfo %s can't read by error: %v", name, err)
		}
		return a.info, nil
	}
	return nil, fmt.Errorf("AssetInfo %s not found", name)
}

// AssetNames returns the names of the assets.
func AssetNames() []string {
	names := make([]string, 0, len(_bindata))
	for name := range _bindata {
		names = append(names, name)
	}
	return names
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string]func() (*asset, error){
	"../node_modules/@kosu/system-contracts/src/deployedAddresses.json": Node_modulesKosuSystemContractsSrcDeployedaddressesJson,
}

// AssetDir returns the file names below a certain
// directory embedded in the file by go-bindata.
// For example if you run go-bindata on data/... and data contains the
// following hierarchy:
//     data/
//       foo.txt
//       img/
//         a.png
//         b.png
// then AssetDir("data") would return []string{"foo.txt", "img"}
// AssetDir("data/img") would return []string{"a.png", "b.png"}
// AssetDir("foo.txt") and AssetDir("notexist") would return an error
// AssetDir("") will return []string{"data"}.
func AssetDir(name string) ([]string, error) {
	node := _bintree
	if len(name) != 0 {
		cannonicalName := strings.Replace(name, "\\", "/", -1)
		pathList := strings.Split(cannonicalName, "/")
		for _, p := range pathList {
			node = node.Children[p]
			if node == nil {
				return nil, fmt.Errorf("Asset %s not found", name)
			}
		}
	}
	if node.Func != nil {
		return nil, fmt.Errorf("Asset %s not found", name)
	}
	rv := make([]string, 0, len(node.Children))
	for childName := range node.Children {
		rv = append(rv, childName)
	}
	return rv, nil
}

type bintree struct {
	Func     func() (*asset, error)
	Children map[string]*bintree
}

var _bintree = &bintree{nil, map[string]*bintree{
	"..": &bintree{nil, map[string]*bintree{
		"node_modules": &bintree{nil, map[string]*bintree{
			"@kosu": &bintree{nil, map[string]*bintree{
				"system-contracts": &bintree{nil, map[string]*bintree{
					"src": &bintree{nil, map[string]*bintree{
						"deployedAddresses.json": &bintree{Node_modulesKosuSystemContractsSrcDeployedaddressesJson, map[string]*bintree{}},
					}},
				}},
			}},
		}},
	}},
}}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(dir, name string) error {
	data, err := Asset(name)
	if err != nil {
		return err
	}
	info, err := AssetInfo(name)
	if err != nil {
		return err
	}
	err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
	if err != nil {
		return err
	}
	err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
	if err != nil {
		return err
	}
	return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(dir, name string) error {
	children, err := AssetDir(name)
	// File
	if err != nil {
		return RestoreAsset(dir, name)
	}
	// Dir
	for _, child := range children {
		err = RestoreAssets(dir, filepath.Join(name, child))
		if err != nil {
			return err
		}
	}
	return nil
}

func _filePath(dir, name string) string {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}
